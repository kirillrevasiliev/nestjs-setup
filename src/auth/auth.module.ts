import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UsersModule } from '@app/users/users.module';
import { EmailModule } from '@app/email/email.module';
import { TokensModule } from '@app/tokens/tokens.module';

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
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    EmailModule,
    TokensModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
