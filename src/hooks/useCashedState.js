import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCachedState } from '@/state-mangement/features/cachedSlice'; // Import your Redux slice action

export default function useCachedState(key, initialValue) {
  const dispatch = useDispatch();
  // const allCachedValue = useSelector((state) => state.cached.cachedData);
  const cachedValue = useSelector((state) => state.cached.cachedData[key]);
  const [state, setState] = useState(cachedValue ?? initialValue);

  const setCachedState = (newState) => {
    setState(newState);
    dispatch(updateCachedState({ key, value: newState }));
  };
  useEffect(() => {
    //for sync between state abd cachedData
    setState(cachedValue);
  }, [cachedValue]);

  return [state, setCachedState];
}
