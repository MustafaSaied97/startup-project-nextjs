export const requestCacheManager = (() => {
  let instance;

  function createInstance() {
    const cache = new Map(); // Using Map to store cached responses

    return {
      get: (key) => cache.get(key),
      set: (key, value) => cache.set(key, value),
      has: (key) => cache.has(key),
      delete: (key) => cache.delete(key),
    };
  }

  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();
