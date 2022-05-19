import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '@app/users/users.service';
import { UsersEntity } from '@app/users/users.entity';
import { omit } from '@app/app/utils/object';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string): Promise<UsersEntity | null> {
    const user = await this.usersService.findOne({ email });
    if (user) {
      return omit(user, ['password']);
    }
    return null;
  }

  async login(user: any) {
    const userDB = await this.usersService.findOne({ email: user.email });
    const payload = { email: user.email, sub: userDB.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
