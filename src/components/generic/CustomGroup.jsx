'use client'
import React, { useRef, useState } from 'react';

const CustomGroup = ({ Button, List }) => {
  const [isOpen, setIsOpen] = useState(false);
  const container = useRef(null);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div ref={container} className={` relative `}>
      <Button toggle={toggle} isOpen={isOpen} />
      <List isOpen={isOpen} />
    </div>
  );
};

export default CustomGroup;