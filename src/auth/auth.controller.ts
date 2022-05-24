import { Controller, Request, Get } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }
}
