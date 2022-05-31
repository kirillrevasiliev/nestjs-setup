import { Module } from '@nestjs/common';

import { ConfigModule } from '@app/config';
import { UserModule } from '@app/user/user.module';
import { DatabaseModule } from '@app/database/database.module';
import { AuthModule } from '@app/auth/auth.module';
import { EmailModule } from '@app/email/email.module';

import databaseConfig from '@app/database/database.config';
import authConfig from '@app/auth/auth.config';
import emailConfig from '@app/email/email.config';

import appConfig from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, authConfig, emailConfig, appConfig],
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    EmailModule,
  ],
})
export class AppModule {}
