'use client'
// LoadMoreButton.js
import React, { useState } from 'react';

export default function LoadMoreButton({ onLoadMore, hasMore, buttonText = 'Load more' }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    await onLoadMore(); // Call the provided load more function
    setIsLoading(false);
  };

  // Render nothing if there are no more items to load
  if (!hasMore) return null;

  return (
    <button
      onClick={handleClick}
      className='mx-auto mt-7 flex w-fit items-center gap-1 rounded-md bg-[var(--primary-clr)] px-4 py-2 text-xs font-medium text-white sm:px-6 sm:py-3 sm:text-base'
      disabled={isLoading}
    >
      {buttonText}
      {isLoading && '...'}
    </button>
  );
}
