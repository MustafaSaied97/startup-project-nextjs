'use client';
import React, { useMemo } from 'react';
import { FacebookIcon, TwitterXIcon, DiscordIcon, InstagramIcon } from '@/assets/icons/components';
import { useSelector } from 'react-redux';

export default function SocialMedia() {
  const layoutData = useSelector((state) => state.layout.layoutData);
  const socialMedia = useMemo(() =>
    [
      { icon: () => <FacebookIcon />, url: layoutData?.social_media?.facebook },
      { icon: () => <TwitterXIcon />, url: layoutData?.social_media?.twitter },
      { icon: () => <DiscordIcon />, url: layoutData?.social_media?.discord },
      { icon: () => <InstagramIcon />, url: layoutData?.social_media?.instagram },
    ].filter((item) => item?.url)
  );
  return (
    <>
      {socialMedia.map((item, index) => (
        <button key={index} onClick={() => window.open(item?.url, '_blank')}>
          <item.icon />
        </button>
      ))}
    </>
  );
}
