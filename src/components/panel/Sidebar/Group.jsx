'use client';
import React, { useRef, useState } from 'react';

const Group = ({ Button, List }) => {
  const [isOpen, setIsOpen] = useState(false);
  const container = useRef(null);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div ref={container} className={`${isOpen ? 'bg-slate-300/30 shadow-[-2px_3px_7px_0px_#80808040]' : ''}  group relative `}>
      <Button toggle={toggle} isOpen={isOpen} />
      <List isOpen={isOpen} />
    </div>
  );
};

export default Group;
