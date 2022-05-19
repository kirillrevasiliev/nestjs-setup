import { Controller, Request, Get } from '@nestjs/common';

import { AuthService } from '@app/auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }
}
