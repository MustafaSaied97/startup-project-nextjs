'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import fallbackImage from '@/assets/icons/failed-img.jpg';
const imageLoader = ({ src, width=100, quality=75 }) => `https://example.com/${src}?w=${width}&q=${quality}`;
export default function CustomImg({ src, fallbackSrc = fallbackImage, ...rest }) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  useEffect(() => {
    setImgSrc(src);
  }, [src]);
  return (
    <Image
      // loader={() => imageLoader({ src: imgSrc })}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
      {...rest}
    />
  );
}
