import { Controller, Request, Post, UseInterceptors, ClassSerializerInterceptor, Query, Body } from '@nestjs/common';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

import { User } from '@app/user/user.entity';

import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { AuthUser } from './decorators/auth.user.decorator';
import { ConfirmEmailDto } from './dtos/confirm-email.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { ConfirmPasswordDto } from './dtos/confirm-password.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { SignUpUserDto } from './dtos/signup-user.dto';

@Controller()
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('auth/login')
  @ApiBody({ type: LoginUserDto })
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('auth/signUp')
  @ApiBody({ type: SignUpUserDto })
  async signUp(@Request() req) {
    return this.authService.signUp(req.body);
  }

  @Auth()
  @ApiBearerAuth()
  @Post('auth/confirm')
  @ApiBody({ type: ConfirmEmailDto })
  async confirm(@AuthUser() currentUser: User, @Query() body: ConfirmEmailDto) {
    return this.authService.confirmEmail(currentUser.id, body.code);
  }

  @Auth()
  @ApiBearerAuth()
  @Post('auth/resendCode')
  async resendCode(@AuthUser() currentUser: User) {
    return this.authService.sendConfirmEmail(currentUser);
  }

  @Post('auth/resetPassword')
  @ApiBody({ type: ResetPasswordDto })
  async resetPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body.email);
  }

  @Post('auth/confirmPassword')
  @ApiBody({ type: ConfirmPasswordDto })
  async confirmPassword(@Body() body: ConfirmPasswordDto) {
    return this.authService.confirmPassword(body.code, body.password);
  }
}
