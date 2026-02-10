// lib/redis.js - In-memory cache solution (replaces Redis)
/**
 * Simple in-memory cache with TTL support
 * More performant than Redis for small to medium data
 * No external service required
 */

const cache = new Map();

const getRedisClient = () => {
  return {
    get: async (key) => {
      const item = cache.get(key);
      if (!item) return null;

      // Check if item has expired
      if (item.expireAt && Date.now() > item.expireAt) {
        cache.delete(key);
        return null;
      }

      return item.value;
    },

    set: async (key, value, options = {}) => {
      const item = { value };

      // Handle TTL (EX option in seconds)
      if (options.EX) {
        item.expireAt = Date.now() + options.EX * 1000;
      }

      cache.set(key, item);
      return "OK";
    },

    del: async (key) => {
      return cache.delete(key) ? 1 : 0;
    },

    flushAll: async () => {
      cache.clear();
      return "OK";
    },
  };
};

export { getRedisClient };
