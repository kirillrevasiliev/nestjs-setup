import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as unique from 'uniqid';

import { FirebaseService } from '@app/firebase/firebase.service';

import File from './file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private publicFilesRepository: Repository<File>,
    private storageService: FirebaseService,
  ) {}

  async uploadFile(dataBuffer: Buffer, filename: string): Promise<File> {
    const fileKey = `avatar/${unique()}-${filename}`;
    const avatar = await this.storageService.writeFile(dataBuffer, fileKey);
    const newFile = await this.publicFilesRepository.create({
      key: fileKey,
      url: avatar,
    });
    return await this.publicFilesRepository.save(newFile);
  }

  async deleteFile(fileId) {
    await this.storageService.deleteFile(fileId);
    return await this.publicFilesRepository.delete({ key: fileId });
  }
}
