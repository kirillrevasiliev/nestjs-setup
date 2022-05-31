import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserModule } from '@app/user/user.module';
import { EmailModule } from '@app/email/email.module';
import { TokenModule } from '@app/token/token.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('auth.secret'),
        signOptions: configService.get<object>('auth.signOptions'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    EmailModule,
    TokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
