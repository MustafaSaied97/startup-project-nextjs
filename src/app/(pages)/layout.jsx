import React from 'react';
import DefaultPagesLayout from '@/components/layouts/DefaultPagesLayout';

export default async function PagesLayout({ children }) {
  return <DefaultPagesLayout>{children}</DefaultPagesLayout>;
}
