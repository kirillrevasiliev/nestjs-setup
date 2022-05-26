import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '@app/users/users.service';
import { User } from '@app/users/users.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  validateUser(payload: User): Promise<Partial<User> | null> {
    return this.usersService.findByLogin(payload);
  }

  async login(user: any) {
    const userDB = await this.usersService.findByLogin(user);
    const payload = { sub: userDB.id, ...userDB };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
