import { Module } from '@nestjs/common';

import { ConfigModule } from '@app/config';
import { UsersModule } from '@app/users/users.module';
import { DatabaseModule } from '@app/database/database.module';
import { AuthModule } from '@app/auth/auth.module';

import databaseConfig from '@app/database/database.config';

import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
