import { Queue } from 'bullmq';
import { Redis } from 'ioredis';

const connection = new Redis(process.env.REDIS_URL!);

export const talentQueue = new Queue('talent-queue', { connection });
export const gigQueue = new Queue('gig-queue', { connection });
