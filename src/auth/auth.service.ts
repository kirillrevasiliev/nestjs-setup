import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '@app/users/users.service';
import { User } from '@app/users/users.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  validateUser(email: string): Promise<User | null> {
    return this.usersService.findOne({ email });
  }

  async login(user: any) {
    const userDB = await this.usersService.findOne({ email: user.email });
    const payload = { email: user.email, sub: userDB.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
