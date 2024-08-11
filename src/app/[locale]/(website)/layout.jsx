import React from 'react';
import { websiteApis } from '@/services/serverApis';
import WebsiteLayoutProvider from '@/providers/WebsiteLayoutProvider';
export default async function WebsiteLayout({ children }) {
  const { data: layoutData } = (await websiteApis.getLayout()) || {}; // used in InfoBar,NavBar1,MainFooter,HomePage,SEO,DefaultFormLayout
  return <WebsiteLayoutProvider layoutData={layoutData}>{children}</WebsiteLayoutProvider>;
}
