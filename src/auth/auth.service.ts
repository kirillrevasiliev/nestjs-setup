import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserService } from '@app/user/user.service';
import { User } from '@app/user/user.entity';
import { EmailService } from '@app/email/email.service';
import { TransactionService } from '@app/database/transaction.service';
import { TokenService } from '@app/token/token.service';
import { TYPE } from '@app/token/token.constants';
import { Token } from '@app/token/token.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService,
    private transactionService: TransactionService,
    private tokensService: TokenService,
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
      return {
        statusCode: 200,
        message: 'Email confirmed',
      };
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

  async resetPassword(email: string) {
    const userDB = await this.usersService.findByEmail(email);

    const { code } = await this.tokensService.generate(TYPE.CONFIRM_PASSWORD, userDB.id);
    const url = `${this.configService.get<string>('app.frontHost')}/auth/confirm?code=${code}`;

    await this.emailService.sendResetPasswordConfirmation(userDB, url);
    return {
      statusCode: 200,
      message: 'Check your email address',
    };
  }

  async confirmPassword(code: string, password: string) {
    return this.transactionService.transaction<void>(async ({ queryRunner: { manager } }) => {
      try {
        const token = await manager.findOneOrFail(Token, { code });

        const user = await manager.findOneOrFail(User, token.userId);

        await this.tokensService.verify(user.id, code, manager);
        user.password = password;
        await this.usersService.updateUser(user);
      } catch {
        throw new HttpException('Code already in use', HttpStatus.BAD_REQUEST);
      }

      return {
        statusCode: 200,
        message: 'Now you can login',
      };
    });
  }
}
