import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '@app/users/users.service';
import { UsersEntity } from '@app/users/users.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ email });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UsersEntity) {
    const userDB = await this.usersService.findOne({ email: user.email });
    const payload = { email: user.email, sub: userDB.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
