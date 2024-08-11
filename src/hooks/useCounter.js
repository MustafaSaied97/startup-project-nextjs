import { useState, useEffect } from 'react';
import { debounceFunc, storageManager } from '@/utils';

export default function useCounter(initailVal = 0) {
  const [counter, setCounter] = useState(initailVal);
  useEffect(() => {
    //initalize counter from localstroage if exist
    const counterFromLocal = storageManager.get('count') || 0;
    counterFromLocal && setCounter(counterFromLocal);
  }, []);
  useEffect(() => {
    counter !== 0 &&
      debounceFunc(() => {
        const newCount = counter - 1;
        setCounter(newCount);
        storageManager.set('count', newCount);
      }, 1000)();
  }, [counter]);
  return [counter, setCounter];
}
