'use client'
import React, { useState ,useRef} from 'react';

export default function CustomDropdown({ Button,List }) {
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
    <div ref={container} onBlur={handleBlur} className={`  group relative `}>
      <Button toggle={toggle} isOpen={isOpen} />
      <List isOpen={isOpen} close={close} />
    </div>
  );
}
