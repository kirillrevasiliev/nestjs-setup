import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UsersService } from '@app/users/users.service';
import { User } from '@app/users/users.entity';
import { EmailService } from '@app/email/email.service';
import { TransactionService } from '@app/database/transaction.service';
import { TokensService } from '@app/tokens/tokens.service';
import { TYPE } from '@app/tokens/tokens.constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService,
    private transactionService: TransactionService,
    private tokensService: TokensService,
  ) {}

  validateUser(payload: User): Promise<Partial<User> | null> {
    return this.usersService.findByLogin(payload);
  }

  async login(user: User) {
    const userDB = await this.usersService.findByLogin(user);
    const payload = { sub: userDB.id, ...userDB };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(user: User): Promise<Partial<User> | null> {
    const userDB = await this.usersService.create(user);
    await this.sendConfirmEmail(userDB);
    return userDB;
  }

  async confirmEmail(userId: User['id'], code: string) {
    return this.transactionService.transaction<void>(async ({ queryRunner: { manager } }) => {
      const user = await manager.findOneOrFail(User, userId);
      if (user.isEmailConfirmed) {
        throw new HttpException('This email already verified', HttpStatus.BAD_REQUEST);
      }
      try {
        await this.tokensService.verify(userId, code, manager);
      } catch {
        throw new HttpException('Token already in use', HttpStatus.BAD_REQUEST);
      }

      user.isEmailConfirmed = true;
      await manager.save(user);
    });
  }

  async sendConfirmEmail(user: User, type: TYPE = TYPE.CONFIRM_EMAIL) {
    if (user.isEmailConfirmed) {
      throw new HttpException('This email already verified', HttpStatus.BAD_REQUEST);
    }
    const { code } = await this.tokensService.generate(type, user.id);
    const url = `${this.configService.get<string>('app.frontHost')}/auth/confirm?code=${code}`;
    await this.emailService.sendEmailConfirmation(user, url);
    return user;
  }
}
