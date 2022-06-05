import { Module } from '@nestjs/common';

import { ConfigModule } from '@app/config';
import { UserModule } from '@app/user/user.module';
import { DatabaseModule } from '@app/database/database.module';
import { AuthModule } from '@app/auth/auth.module';
import { EmailModule } from '@app/email/email.module';
import { ChatModule } from '@app/chat/chat.module';
import { FileModule } from '@app/file/file.module';

import databaseConfig from '@app/database/database.config';
import authConfig from '@app/auth/auth.config';
import emailConfig from '@app/email/email.config';
import firebaseConfig from '@app/firebase/firebase.config';

import appConfig from './app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, authConfig, emailConfig, appConfig, firebaseConfig],
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    EmailModule,
    ChatModule,
    FileModule,
  ],
})
export class AppModule {}
