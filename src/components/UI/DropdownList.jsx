'use client';
import React, { useState, useRef } from 'react';

export default function DropdownList({ Button, List }) {
  const [isOpen, setIsOpen] = useState(false);
  const container = useRef(null);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const close = () => {
    setIsOpen(false);
  };
  const handleBlur = (e) => {
    setIsOpen(false);
  };

  return (
    <div ref={container} onBlur={handleBlur} className={`relative m-0 p-0 h-full inline-block`}>
      <Button toggle={toggle} isOpen={isOpen} />
      <List isOpen={isOpen} close={close} />
    </div>
  );
}
