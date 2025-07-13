import 'dotenv/config';
import { Redis } from 'ioredis';

const connection = new Redis(process.env.REDIS_URL as string);

export { connection as redis };