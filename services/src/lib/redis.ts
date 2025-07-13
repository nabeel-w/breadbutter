import "dotenv/config";
import { Redis } from "ioredis";

const connection = new Redis(process.env.REDIS_URL as string, {
  maxRetriesPerRequest: null, // 👈 Required by BullMQ Workers
  enableReadyCheck: false, // Optional but recommended
});

export { connection as redis };
