import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthMethod, User, UserRole } from '@crm/prisma/generated/prisma';
import { hash } from 'bcryptjs';


@Injectable()
export class UserService {
  public constructor(
    private readonly prisma: PrismaService
  ) { }

  public async getAuthUser(req) {
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('Auth user is not defined!');
    }
    return { authUser: user };
  }

  public async getUsers(count = 10, req) {
    // if (!req.user) {
    //   throw new UnauthorizedException('Auth user is not defined!');
    // }
    const users = await this.prisma.user.findMany();
    return users;
  }

  public async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        externalAccounts: true,
      }
    });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }
  public async findByEmail(
    email: string,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        externalAccounts: true,
      }
    });
  
    return user;
  }
  public async createUser(
    email: string,
    password: string,
    name: string,
    surname: string,
    avatar: string,
    // points: number,
    role: UserRole,
    method: AuthMethod,
    isEmailVerified: boolean,
  ) {
    const user = await this.prisma.user.create({
      data: {
        email,
        password: password ? await hash(password, 10) : '',
        name,
        surname,
        avatar,
        role,
        method,
        displayName: `${name} ${surname}`,
        isEmailVerified: isEmailVerified,
      },
      include: {
        externalAccounts: true,
      }
    }

    );
    return user;
  }

  // async follow(currentUserId: number, followedId: number) {
  //   // Здесь ваша логика подписки
  //   return {  message: `${currentUserId} now follows ${followedId}` };
  // }

  // async unfollow(currentUserId: number, followedId: number) {
  //   // Здесь ваша логика отписки
  //   return {  message: `${currentUserId} unfollowed ${followedId}` };
  // }
}
