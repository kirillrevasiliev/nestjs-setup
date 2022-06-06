import { registerAs } from '@app/config';

export default registerAs('auth', () => ({
  secret: process.env.JWT_SECRET_KEY,
  signOptions: {
    expiresIn: '10h',
  },
}));
