// lib/redis.js
import { createClient } from 'redis';

const client = createClient({
  username: 'default',
  password: process.env.REDIS_PASSWORD, // safer to use .env
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

client.on('error', (err) => console.error('Redis Client Error', err));

let isConnected = false;

export async function getRedisClient() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  return client;
}
