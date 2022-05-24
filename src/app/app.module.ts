import { Module } from '@nestjs/common';

import { ConfigModule } from '@app/config';
import { UsersModule } from '@app/users/users.module';
import { DatabaseModule } from '@app/database/database.module';
import { AuthModule } from '@app/auth/auth.module';
import { AuthController } from '@app/auth/auth.controller';

import databaseConfig from '@app/database/database.config';
import authConfig from '@app/auth/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, authConfig],
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AuthController],
})
export class AppModule {}
