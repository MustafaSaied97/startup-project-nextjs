const isString = (x) => Object.prototype.toString.call(x) === '[object String]';
const isTokenValid = (token) => {
  if (!token || typeof token !== 'string') {
    return false;
  }
  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : {};
  if (decodedToken?.exp) {
    return decodedToken?.exp * 1000 >= new Date().getTime();
  } else {
    return false;
  }
};
const youtubeParser = (url) => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
};
const objectToQueryString = (obj, { isEncoded = true } = {}) => {
  // Extract keys from the object
  const keys = Object.keys(obj);

  // Map each key-value pair to a string in the format 'key=value'
  const keyValuePairs = isEncoded ? keys.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`) : keys.map((key) => `${key}=${obj[key]}`);
  // Join the key-value pairs with '&' to form the query string
  return keyValuePairs.length ? `?${keyValuePairs.join('&')}` : '';
};
// text trimmer
const trimText = (txt, limit) => (txt ? `${txt.split('').length > limit ? txt.split('').slice(0, limit).join('') + '...' : txt}` : '');

const lowerString = (txt) => (typeof txt === 'string' ? txt.toLowerCase() : typeof txt === 'number' ? txt : '');

const upperString = (txt) => (typeof txt === 'string' ? txt.toUpperCase() : typeof txt === 'number' ? txt : '');

const generateRandomId = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }

  return id;
};
function getRandomNumber({ min = 1, max = 1, isRounded = false }) {
  return isRounded ? Math.floor(Math.random() * (max - min + 1)) + min : Math.random() * (max - min + 1);
}

const storageManager = {
  localStorageAppKey: 'Market BFF',
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
  currentLocalStorageData: null, // Initialize to null initially

  // Initialize currentLocalStorageData after defining all methods
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
// Initialize currentLocalStorageData
storageManager.init();

const formatNumber = (num, precision = 2) => {
  if (!num) return '';
  num = typeof num === 'string' ? Number(num) : num;
  const map = [
    { suffix: 'T', threshold: 1e12 },
    { suffix: 'B', threshold: 1e9 },
    { suffix: 'M', threshold: 1e6 },
    { suffix: 'K', threshold: 1e3 },
    { suffix: '', threshold: 1 },
  ];

  const found = map.find((x) => Math.abs(num) >= x.threshold);
  if (found) {
    const number = (num / found.threshold).toFixed(precision);
    const formattedNumber = number.replace(/\.?0+$/, ''); //remove zeros after (.) if all of them are zeros
    const unit = found.suffix;
    return formattedNumber + unit;
  }
  const formattedNum = num.toString().replace(/\.?0+$/, '');
  return formattedNum;
};

const arabizeNumbers = (str) => {
  const currentLang = storageManager.get('get') || 'ar';
  if (lowerString(currentLang) !== 'ar') {
    return str;
  }
  if (typeof str !== 'string') {
    return '';
  }
  var id = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return str.replace(/[0-9]/g, function (w) {
    return id[+w];
  });
};
const removeDuplicatedObjectsFromAnArray = ({ array, keyToCheck = 'id' }) => {
  return Array.from(new Set(array.map((x) => x[keyToCheck]))).map((w) => array.find((el) => el[keyToCheck] === w));
};

const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    let isSupported = 'navigator' in window && 'geolocation' in navigator;

    const success = (position) => {
      const coordinates = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      resolve(coordinates);
    };

    const error = (error) => {
      console.error('Error getting location:', error);
      reject(error);
    };

    const options = {
      enableHighAccuracy: true,
      maximumAge: 2000,
      timeout: 1000 * 5,
    };

    if (isSupported) {
      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      reject(new Error('Geolocation is not supported in this browser.'));
    }
  });
};
const parseQueryString = (queryString) => {
  const params = {};
  const searchParams = new URLSearchParams(queryString);
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }
  return params;
};

// debounceFunc debounce
let timeoutId;
const debounceFunc = (func, delay) => {
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, Number(delay));
  };
};

const scrollToErrorBox = () => {
  debounceFunc(() => {
    //make latency with debounce to make sure that class that added to the dom so you cane the elemt that has this class
    // make sure you have the class '.scroll_to_err' in your error element
    const firstErrorEle = document.querySelectorAll('.scroll_to_err')?.[0];
    // console.log('firstErrorEle', firstErrorEle);
    if (firstErrorEle) {
      firstErrorEle.scrollIntoView({ block: 'center', behavior: 'smooth' });
    } else {
      return;
    }
  }, 500)();
};

const changeColorTheme = (theme = 'light') => {
  //update dom
  let html = document.documentElement;
  html.classList.remove(theme == 'light' ? 'dark' : 'light');
  html.classList.add(theme);
  //update LocalStorage
  storageManager.set('theme', theme);
};

export {
  trimText,
  formatNumber,
  storageManager,
  scrollToErrorBox,
  lowerString,
  arabizeNumbers,
  upperString,
  isString,
  isTokenValid,
  generateRandomId,
  getRandomNumber,
  youtubeParser,
  removeDuplicatedObjectsFromAnArray,
  getCurrentLocation,
  debounceFunc,
  parseQueryString,
  changeColorTheme,
  objectToQueryString,
};

export function findItemById(Arr, targetId) {
  if (!Arr || !targetId) return;
  for (let index = 0; index < Arr.length; index++) {
    const item = Arr[index];
    if (item.id == targetId) {
      return item;
    } else if (item?.children?.length) {
      const subItem = findItemById(item?.children, targetId);
      if (subItem) return subItem;
    }
  }
}
export function getInitials(fullName='') {
  const nameArray = fullName.trim().split(' '); // Split the full name by spaces

  if (nameArray.length < 2) {
    // If there's no last name provided, return only the first letter of the first name
    return nameArray[0] ? nameArray[0][0].toUpperCase() : '';
  }

  const firstNameInitial = nameArray[0][0].toUpperCase();
  const lastNameInitial = nameArray[nameArray.length - 1][0].toUpperCase();

  return `${firstNameInitial}${lastNameInitial}`;
}
export function getTodayHours() {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push(`${i}:00`);
  }
  return hours;
}
export function getDaysInMonth(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  return days;
}

export function getCurrentMonthDays() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  return getDaysInMonth(year, month);
}

export function formatDate(dateString) {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Define an array of month names
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Get the month name
  const month = monthNames[date.getMonth()];

  // Get the day
  const day = date.getDate();

  // Get the year
  const year = date.getFullYear();

  // Format the date as "Dec 30, 2023"
  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
}
export function readFileAsBase64(fileOrFileList) {
  const file = fileOrFileList instanceof FileList ? fileOrFileList[0] : fileOrFileList;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
export function retrieveFileFromBase64(base64File, filename = 'file' + new Date()) {
  // Split the base64 string to get the actual base64 content and the mime type
  const [mimeString, base64Content] = base64File.split(';base64,');
  const mimeType = mimeString.split(':')[1];

  // Decode the base64 content to binary data
  const byteString = atob(base64Content);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // Create a Blob from the binary data
  const blob = new Blob([ab], { type: mimeType });

  // Create a File object from the Blob
  const file = new File([blob], filename, { type: mimeType });

  return file;
}
export function isFileSystemObject(obj) {
  if (obj instanceof File || obj instanceof Blob) {
    return true;
  }

  // Check if the object is a FileList
  if (obj instanceof FileList) {
    return true;
  }

  // Check if the object has a `length` property and the first item is a File
  if (obj && typeof obj.length === 'number' && obj.length > 0 && obj[0] instanceof File) {
    return true;
  }

  return false;
}
export function isBase64(str) {
    if (typeof str !== 'string') {
      return false;
    }
  const base64Pattern = /^data:([a-zA-Z0-9-]+\/[a-zA-Z0-9-+.]+)?;base64,(?:[A-Za-z0-9+/]|[A-Za-z0-9+/][-_])*={0,2}$/;
  return base64Pattern.test(str);
}
export function convertImgFileToUrl(ImgFile) {
  if (!ImgFile) return '';
  const url = window?.URL?.createObjectURL(ImgFile?.[0] || ImgFile);
  return url;
}