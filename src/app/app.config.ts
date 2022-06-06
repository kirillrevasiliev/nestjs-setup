import { registerAs } from '@app/config';

export default registerAs('app', () => ({
  frontHost: process.env.FRONT_HOST,
}));
