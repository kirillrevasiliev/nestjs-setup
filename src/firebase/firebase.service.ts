import { Injectable } from '@nestjs/common';
import { initializeApp, cert, App } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';

import { ConfigService } from '@app/config';

@Injectable()
export class FirebaseService {
  public app: App;

  constructor(private readonly configService: ConfigService) {
    this.app = initializeApp({
      credential: cert(configService.get('firebase')),
      storageBucket: configService.get('firebase.bucket'),
    });
  }

  async writeFile(dataBuffer: Buffer, filename: string) {
    const file = await getStorage(this.app).bucket().file(filename);
    await file.save(dataBuffer);
    await file.makePublic();
    return file.publicUrl();
  }

  async deleteFile(fileId) {
    await getStorage(this.app).bucket().file(fileId).delete();
  }
}
