import { Controller, Post, Body, UseGuards, Req, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ApiCustomResponse, ApiCustomErrorResponse } from '../../common/decorators/api-response.decorator';
import { UserResponseDto } from './dto/user-response.dto';
import { LogoutResponseDto } from './dto/logout-response.dto';
import { Recaptcha } from '@nestlab/google-recaptcha';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @Recaptcha()
    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiCustomResponse(UserResponseDto)
    @ApiCustomErrorResponse([
        'Name is required',
        'Email is invalid',
        'Password must be at least 8 characters long'
    ])
    async register(@Req() req, @Body() dto: RegisterDto) {
        return this.authService.register(req, dto);
    }

    @Recaptcha()
    @Post('login')
    @ApiOperation({ summary: 'Login user' })
    @ApiCustomResponse(UserResponseDto)
    @ApiCustomErrorResponse([
        'Invalid credentials',
        'User not found'
    ])
    async login(@Req() req, @Body() dto: LoginDto) {
        return this.authService.login(req, dto);
    }

    @Recaptcha()
    @Post('logout')
    @ApiOperation({ summary: 'Logout user' })
    @ApiCustomResponse(LogoutResponseDto)
    @ApiCustomErrorResponse('Failed to logout')
    async logout(@Req() req, @Res() res) {
        return this.authService.logout(req, res);
    }
}
