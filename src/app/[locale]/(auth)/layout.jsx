import React from 'react';
import DefaultFormLayout from '@/components/layouts/DefaultFormLayout';

export default async function FormLayout({ children }) {
  return <DefaultFormLayout>{children}</DefaultFormLayout>;
}
