import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule, JwtModuleOptions, JwtSignOptions } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getRecaptchaConfig } from "@/config/recaptcha.congig";
import { GoogleRecaptchaModule } from "@nestlab/google-recaptcha";
import { JwtStrategy } from "./jwt.strategy";


@Module({
    imports: [
       GoogleRecaptchaModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: getRecaptchaConfig,
       }),
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService): JwtModuleOptions => ({
                secret: configService.get<string>('JWT_SECRET') || 'secretKey',
                signOptions: {
                    expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '1d' as string,
                } as JwtSignOptions,
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})

export class AuthModule { }