import * as path from 'path';

import { registerAs } from '@app/config';

export default registerAs('email', () => ({
  host: process.env.EMAIL_HOST,
  nameFrom: process.env.NAME_FROM || 'Nestjs.Admin',
  emailService: process.env.EMAIL_SERVICE,
  emailFrom: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
  templateDir: path.resolve(__dirname, 'templates'),
  transport: process.env.EMAIL_TRANSPORT,
}));
