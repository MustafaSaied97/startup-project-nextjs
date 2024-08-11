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
    // if (container.current.contains(e.target)) return;
    // console.log('e.target', e.target);
    //   console.log('e.relatedTarget', e.relatedTarget);
    //   console.log('container.current', container.current);
    //   console.log('container.current.contains(e.target)', container.current.contains(e.target));
    setIsOpen(false);
    // console.log('on');
  };
  
  return (
    <div ref={container} onBlur={handleBlur} className={`  group relative `}>
      <Button toggle={toggle} isOpen={isOpen} />
      <List isOpen={isOpen} close={close} />
    </div>
  );
}
