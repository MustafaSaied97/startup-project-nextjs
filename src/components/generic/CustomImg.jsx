'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import fallbackImage from '@/assets/images/failed-img.jpg';

const imageLoader = ({ src, width = 100, quality = 75 }) => `https://example.com/${src}?w=${width}&q=${quality}`;

export default function CustomImg({ src, fallbackSrc = fallbackImage, alt = 'Image', ...rest }) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

  useEffect(() => {
    setImgSrc(src || fallbackSrc); 
  }, [src, fallbackSrc]);

  return (
    <Image
      loader={() => imageLoader({ src: imgSrc })}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
      {...rest}
    />
  );
}
