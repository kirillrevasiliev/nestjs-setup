import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FirebaseModule } from '@app/firebase/firebase.module';

import File from './file.entity';
import { FileService } from './file.service';

@Module({
  imports: [TypeOrmModule.forFeature([File]), FirebaseModule],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
