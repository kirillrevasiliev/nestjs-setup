import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule as Config } from '@nestjs/config';
import { ConfigFactory, ConfigModuleOptions } from '@nestjs/config/dist/interfaces';

@Module({})
export class ConfigModule {
  static forFeature(config: ConfigFactory) {
    return Config.forFeature(config);
  }

  static forRoot(config: ConfigModuleOptions = {}) {
    const rewrite = {
      ...config,
      isGlobal: true,
      envFilePath: path.resolve(__dirname, '../..', '.env'),
    };
    return Config.forRoot(rewrite);
  }
}
