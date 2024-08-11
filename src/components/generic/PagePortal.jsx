'use client';

import React, { useEffect } from 'react';
export default function PagePortal({ title, description, children }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) document.getElementsByTagName('meta')['description'].content = description;
  }, [title, description]);
  return <>{children}</>;
}
