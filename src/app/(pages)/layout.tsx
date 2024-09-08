import React, { ReactElement } from 'react';
import DefaultPagesLayout from '@/components/layouts/DefaultPagesLayout';

type PropsType = {
  children: ReactElement;
};

export default async function PagesLayout({ children }: PropsType) {
  return <DefaultPagesLayout>{children}</DefaultPagesLayout>;
}
