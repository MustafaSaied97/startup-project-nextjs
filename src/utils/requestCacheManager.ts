
type CacheInstance = {
  get: (key: string) => any;
  set: (key: string, value: any) => Map<any, any>;
  has: (key: string) => boolean;
  delete: (key: string) => boolean;
};
export const requestCacheManager = (() => {
  let cacheInstance: CacheInstance;

  function createInstance(): CacheInstance {
    const cache = new Map(); // Using Map to store cached responses
    console.log('cache', cache);
    return {
      get: (key) => cache.get(key),
      set: (key, value) => cache.set(key, value),
      has: (key) => cache.has(key),
      delete: (key) => cache.delete(key),
    };
  }

  return {
    getInstance: () => {
      if (!cacheInstance) {
        cacheInstance = createInstance();
      }
      return cacheInstance;
    },
  };
})();
