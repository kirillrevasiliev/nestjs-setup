import { Controller, Request, Post, UseInterceptors, ClassSerializerInterceptor, Query, Get, Body } from '@nestjs/common';

import { User } from '@app/users/users.entity';

import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { AuthUser } from './decorators/auth.user.decorator';
import { ConfirmEmailDto } from './dtos/confirm-email';
import { ResetPasswordDto } from './dtos/reset-password';
import { ConfirmPasswordDto } from './dtos/confirm-password';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('auth/signUp')
  async signUp(@Request() req) {
    return this.authService.signUp(req.body);
  }

  @Auth()
  @Post('auth/confirm')
  async confirm(@AuthUser() currentUser: User, @Query() body: ConfirmEmailDto) {
    return this.authService.confirmEmail(currentUser.id, body.code);
  }

  @Auth()
  @Get('auth/resendCode')
  async resendCode(@AuthUser() currentUser: User) {
    return this.authService.sendConfirmEmail(currentUser);
  }

  @Post('auth/resetPassword')
  async resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body.email);
  }

  @Post('auth/confirmPassword')
  async confirmPassword(@Body() body: ConfirmPasswordDto) {
    return this.authService.confirmPassword(body.code, body.password);
  }
}
