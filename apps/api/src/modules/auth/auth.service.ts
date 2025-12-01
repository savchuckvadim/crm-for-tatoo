import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { LoginDto, RegisterDto } from "./dto/auth.dto";
import { User, UserRole } from "@crm/prisma/generated/prisma";
import { AuthMethod } from "@crm/prisma/generated/prisma";
import { compare } from "bcryptjs";
import { Request, Response } from "express";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()

export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) { }

    async register(req: Request, dto: RegisterDto): Promise<{ user: User; accessToken: string }> {
        const isEmailExists = await this.userService.findByEmail(dto.email);
        if (isEmailExists) {
            throw new BadRequestException('Email already exists');
        }

        const user = await this.userService.createUser(
            dto.email,
            dto.password,
            dto.name,
            dto.surname,
            '',
            UserRole.USER,
            AuthMethod.EMAIL,
            false
        );
        
        const accessToken = this.generateJwtToken(user);
        await this.saveSession(req, user);
        
        return { user, accessToken };
    }

    async login(req: Request, dto: LoginDto): Promise<{ user: User; accessToken: string }> {
        const user = await this.userService.findByEmail(dto.email);
        if (!user || !user.password) {
            throw new NotFoundException('User not found. Please check your email and password.');
        }

        const isPasswordValid = await compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials. Please check your email and password.');
        }

        const accessToken = this.generateJwtToken(user);
        await this.saveSession(req, user);
        
        return { user, accessToken };
    }

    async logout(req: Request, res: Response): Promise<void> {
        return new Promise((resolve, reject) => {
            req.session.destroy((err: Error) => {
                if (err) {
                    return reject(
                        new InternalServerErrorException(
                            'Failed to logout. Check session parameters'
                        ));
                }
                const sessionCookieName = this.configService.getOrThrow<string>('SESSION_COOKIE_NAME');
                res.clearCookie(sessionCookieName);
                resolve();
            });
        });
    }

    private generateJwtToken(user: User): string {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        return this.jwtService.sign(payload);
    }

    private async saveSession(req: Request, user: User): Promise<void> {
        return new Promise((resolve, reject) => {
            req.session.userId = user.id;
            req.session.save((err: Error) => {
                if (err) {
                    return reject(new InternalServerErrorException('Failed to save session. Check session parameters'));
                }
                resolve();
            });
        });
    }
}
