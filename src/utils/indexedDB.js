let db = null;

export async function createDB(dbName = 'db-1', dbVersion = 1, objectStores = [{ name: 'forms', keyPath: 'form_no' }]) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = (e) => {
      db = e.target.result;
      objectStores.forEach((store) => {
        if (!db.objectStoreNames.contains(store.name)) {
          db.createObjectStore(store.name, { keyPath: store.keyPath });
          console.log(`Object store '${store.name}' created successfully.`);
        }
      });

      console.log(`upgrade is called database name: ${db.name} version : ${db.version}`);
    };

    request.onsuccess = (e) => {
      db = e.target.result;
      console.log(`success is called database name: ${db.name} version : ${db.version}`);
      resolve(db);
    };

    request.onerror = (e) => {
      console.error(`error: ${e.target.error} was found`);
      reject(e.target.error);
    };
  });
}

export async function addToObjectStore(storeName, data = {}) {
  if (!db) {
    throw new Error('Database is not initialized. Call createDB first.');
  }

  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');

    tx.oncomplete = () => {
      console.log('Transaction completed successfully.');
      resolve();
    };

    tx.onerror = (e) => {
      console.error(`Transaction error: ${e.target.error}`);
      reject(e.target.error);
    };

    const store = tx.objectStore(storeName);
    const request = store.put(data);

    request.onsuccess = () => {
      console.log('Data stored successfully:', data);
    };

    request.onerror = (e) => {
      console.error(`Error storing data: ${e.target.error}`);
      reject(e.target.error);
    };
  });
}

export async function getFromObjectStore(storeName, key = '') {
  if (!db) {
    throw new Error('Database is not initialized. Call createDB first.');
  }

  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const request = key ? store.get(key) : store.getAll();

    request.onsuccess = () => {
      if (request.result) {
        console.log('Data retrieved successfully:', request.result);
        resolve(request.result);
      } else {
        console.log('No data found for the specified key.');
        resolve(null);
      }
    };

    request.onerror = (e) => {
      console.error(`Error retrieving data: ${e.target.error}`);
      reject(e.target.error);
    };
  });
}

export async function deleteObjectStore(storeName, dbName = 'db-1', dbVersion = 1) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (db.objectStoreNames.contains(storeName)) {
        db.deleteObjectStore(storeName);
        console.log(`Object store '${storeName}' deleted successfully.`);
      } else {
        console.log(`Object store '${storeName}' does not exist.`);
      }
    };

    request.onsuccess = (e) => {
      db = e.target.result;
      db.close();
      resolve();
    };

    request.onerror = (e) => {
      console.error(`Error deleting object store '${storeName}': ${e.target.error}`);
      reject(e.target.error);
    };
  });
}

export async function deleteDB(dbName = 'db-1') {
  return new Promise((resolve, reject) => {
    if (db) {
      db.close();
    }
    const request = indexedDB.deleteDatabase(dbName);

    request.onsuccess = () => {
      console.log(`Database '${dbName}' deleted successfully.`);
      resolve();
    };

    request.onerror = (e) => {
      console.error(`Error deleting database '${dbName}': ${e.target.error}`);
      reject(e.target.error);
    };

    request.onblocked = () => {
      console.warn(`Database deletion '${dbName}' is blocked. Close all connections to the database and try again.`);
      reject(new Error('Database deletion blocked.'));
    };
  });
}
