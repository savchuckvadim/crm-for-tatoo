import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto, ResetPasswordDto } from "./dto/auth.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Request } from "express";


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post('register')
  register(@Req() req: Request, @Body() dto: RegisterDto) {
    return this.authService.register(req, dto);
  }

  // @Post('login')
  // login(@Body() dto: LoginDto) {
  //   return this.authService.login(dto.email, dto.password);
  // }

  // @Get('confirm-email/:token')
  // confirmEmail(@Param('token') token: string) {
  //   return this.authService.confirmEmail(token);
  // }

  // @Post('forgot-password')
  // forgotPassword(@Body('email') email: string) {
  //   return this.authService.forgotPassword(email);
  // }

  // @Post('reset-password')
  // resetPassword(@Body() dto: ResetPasswordDto) {
  //   return this.authService.resetPassword(dto.token, dto.newPassword);
  // }

  //   @Get('google')
  //   @UseGuards(AuthGuard('google'))
  //   async googleAuth() {}

  //   @Get('google/callback')
  //   @UseGuards(AuthGuard('google'))
  //   async googleCallback(@Req() req) {
  //     return this.authService.googleLogin(req.user);
  //   }
}
