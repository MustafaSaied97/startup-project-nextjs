import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/navigation';

export default function useQuery(path = '', isScrollToTop = true) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParams = new URLSearchParams(searchParams.toString());

  const addToUrl = (queryString = queryParams.toString()) => {
    router.push(`${path}?${queryString}`, { scroll: isScrollToTop });
  };
  return {
    get: (key) => queryParams.get(key),
    delete: (key) => queryParams.delete(key),
    set: (key, val) => queryParams.set(key, val),
    append: (key, val) => queryParams.append(key, val),
    toString: () => queryParams.toString(),
    toObject: () => Object.fromEntries(queryParams.entries()),
    deleteAll: () =>
      queryParams.keys().forEach((key) => {
        queryParams.delete(key);
      }),
    addToUrl,
  };
}
