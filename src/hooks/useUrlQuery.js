import { useSearchParams, useRouter } from 'next/navigation';

export default function useUrlQuery(path = '', isScrollToTop = true) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParams = new URLSearchParams(searchParams.toString());

  const addToUrl = (queryString = queryParams.toString()) => {
    router.push(`${path}?${queryString}`, { scroll: isScrollToTop });
  };

  return {
    get: (key) => queryParams.get(key),
    delete: (key) => queryParams.delete(key),
    set: (key, val) => queryParams.set(key, val), //Replaces the existing value for a key if it exists, or adds a new key-value pair if it does not.
    append: (key, val) => queryParams.append(key, val), //Adds another value to the same key. This results in a duplicate key, which is supported in URL query strings but can be confusing when multiple values are represented this way.
    // append: (key, val) => {
    //   // Append value to the existing key in a comma-separated format
    //   const existingValue = queryParams.get(key);
    //   if (existingValue) {
    //     // If the key already has a value, append the new value to it
    //     queryParams.set(key, `${existingValue},${val}`);
    //   } else {
    //     // If the key doesn't exist, set it as a new key-value pair
    //     queryParams.set(key, val);
    //   }
    //   /*
    //     //Set or replace a parameter
    //     set('search', 'firstValue');

    //     //Append a value to an existing key
    //     append('search', 'secondValue'); // --> Resulting URL: ?search=firstValue,secondValue
    //   */
    // },
    toString: () => queryParams.toString(),
    toObject: () => Object.fromEntries(queryParams.entries()),
    deleteAll: () =>
      queryParams.keys().forEach((key) => {
        queryParams.delete(key);
      }),
    addToUrl,
  };
}
