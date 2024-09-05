import { useDispatch, useSelector } from 'react-redux';
import { updateCachedState } from '@/state-mangement/features/cachedSlice'; // Import your Redux slice action
import { useState, useEffect } from 'react';

export default function useCachedState(key, initialValue) {
  const dispatch = useDispatch();
  const cachedValue = useSelector((state) => state.cached.cachedData[key]);
  const [state, setState] = useState(cachedValue ?? initialValue);

  const setCachedState = (newState) => {
    setState(newState);
    dispatch(updateCachedState({ key, value: newState }));
  };

  useEffect(() => {
    setState(cachedValue); // Sync state with Redux cache
  }, [cachedValue]);

  return [state, setCachedState];
}
