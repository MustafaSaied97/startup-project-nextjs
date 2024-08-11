'use client';
import React, { useRef, useState, useEffect } from 'react';

export default function TawkChat({ tawkScript = '' }) {
  // useEffect(() => {
  //   console.log('tawkScript', tawkScript);
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(tawkScript, 'text/html');
  //   console.log('doc', doc.documentElement);
  //   // const scriptElement = doc.head.firstChild;
  //   const scriptElement = doc.getElementsByTagName('script')[0];
  //   console.log('scriptElement', scriptElement);
  //   document.body.appendChild(scriptElement);
  //   return () => {
  //     // Clean up the script when the component unmounts
  //     // document.body.appendChild(doc);
  //   };
  // }, []);widget-visible

  useEffect(() => {
    const tawkElement = document.getElementsByClassName('widget-visible')[0];
    tawkElement && tawkElement.style.setProperty('display', 'block', 'important');
    // console.log('tawkElement onmount ', tawkElement);

    return () => {
      // Clean up the script when the component unmounts
      const tawkElement = document.getElementsByClassName('widget-visible')[0];
      // console.log('tawkElement unmount ', tawkElement);
      // tawkElement && tawkElement.remove();
      tawkElement && tawkElement.style.setProperty('display', 'none', 'important');
    };
  }, []);

  return <div id='tawk-ele' dangerouslySetInnerHTML={{ __html: tawkScript }}></div>;
  // return <></>;
}
