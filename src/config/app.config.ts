import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV || 'production',
  port: parseInt(process.env.APP_PORT || process.env.PORT, 10) || 3000,
}));
