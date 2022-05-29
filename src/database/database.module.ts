import { ConnectionOptions, Connection } from 'typeorm';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

import { ConfigService } from '@app/config';

import { TransactionService } from './transaction.service';

const typeOrmFactory = TypeOrmModule.forRootAsync({
  useFactory: (configService: ConfigService) => configService.get('database'),
  inject: [ConfigService],
});

@Global()
@Module({
  imports: [typeOrmFactory],
  exports: [typeOrmFactory, TransactionService],
  providers: [TransactionService],
})
export class DatabaseModule {
  static forFeature(entities?: EntityClassOrSchema[], connection?: Connection | ConnectionOptions | string) {
    return TypeOrmModule.forFeature(entities, connection);
  }
}
