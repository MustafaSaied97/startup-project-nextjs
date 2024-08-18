const storageManager = {
  localStorageAppKey: 'AppKey',
  localStorageBasicData: {
    // theme: 'light',
  },
  getAll() {
    if (typeof localStorage !== 'undefined') {
      try {
        return JSON.parse(localStorage.getItem(this.localStorageAppKey));
      } catch {
        this.reset();
        return JSON.parse(localStorage.getItem(this.localStorageAppKey));
      }
    }
    return null;
  },

  currentLocalStorageData: null,

  init() {
    this.currentLocalStorageData = this.getAll();
  },

  set(key, value) {
    if (!key) return;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.localStorageAppKey, JSON.stringify({ ...this.currentLocalStorageData, [key]: value }));
      window.dispatchEvent(new Event('storage'));
    }
    return;
  },
  get(key) {
    if (typeof localStorage !== 'undefined' && this.currentLocalStorageData) {
      if (key in this.currentLocalStorageData) {
        return this.currentLocalStorageData[key];
      }
    }
    return null;
  },
  delete(key) {
    if (typeof localStorage !== 'undefined' && this.currentLocalStorageData && key in this.currentLocalStorageData) {
      delete this.currentLocalStorageData[key];
      localStorage.setItem(this.localStorageAppKey, JSON.stringify({ ...this.currentLocalStorageData }));
    }
  },
  reset() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.localStorageAppKey, JSON.stringify(this.localStorageBasicData));
      window.dispatchEvent(new Event('storage'));
    }
  },
  listener(callBack) {
    if (typeof callBack !== 'function') return;
    if (typeof localStorage !== 'undefined') {
      window.addEventListener('storage', () => {
        return callBack(storageManager.getAll());
      });
    }
  },
  clear() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.localStorageAppKey, JSON.stringify({}));
      window.dispatchEvent(new Event('storage'));
    }
  },
};

storageManager.init();

export default storageManager;
