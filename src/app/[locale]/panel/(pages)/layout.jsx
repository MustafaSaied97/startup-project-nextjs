import React from 'react';
import DefaultPanelLayout from '@/components/layouts/DefaultPanelLayout';
import './panel.scss'
export default async function PanelLayout({ children }) {
  return <DefaultPanelLayout>{children}</DefaultPanelLayout>;
}
