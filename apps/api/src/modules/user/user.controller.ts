import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  // Публичный маршрут
  @Get('user/auth')
  getAuthUser(@Req() req) {
    return this.userService.getAuthUser(req);
  }

  // Маршруты, доступные только авторизованным пользователям
  // @UseGuards(AuthGuard('jwt'))
  @Get('users')
  getUsers(@Query('count') count: number, @Req() req) {
    const users = this.userService.getUsers(count, req);
    return users;
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('users/:id')
  // getUser(@Param('id') id: number) {
  //   return this.userService.getUser(id);
  // }

  // @UseGuards(AuthGuard('jwt'))
  // @Post('follow')
  // follow(@Req() req, @Body('userId') followedId: number) {
  //   const currentUserId = req.user.userId;
  //   return this.userService.follow(currentUserId, followedId);
  // }

  // @UseGuards(AuthGuard('jwt'))
  // @Delete('follow/:userId')
  // unfollow(@Req() req, @Param('userId') followedId: number) {
  //   const currentUserId = req.user.userId;
  //   return this.userService.unfollow(currentUserId, followedId);
  // }
}
