'use client';
import React, { useRef } from 'react';

export default function Popover() {
  const popoverRef = useRef<HTMLDivElement>(null);
  const handleToggle = (e: React.ToggleEvent<HTMLDivElement>) => {
    console.log('newState of popover', e.newState);
  };
  const handleClickPopoverBtn = (e: React.MouseEvent<HTMLButtonElement>) => popoverRef.current?.showPopover();
  return (
    <>
      <button popoverTarget='mydiv'>Popover</button>
      <button onClick={handleClickPopoverBtn}>ClickPopoverBtn</button>
      <div
        ref={popoverRef}
        className=' fixed m-auto rounded-md bg-gray-300 p-6 backdrop:bg-slate-950/10'
        onToggle={handleToggle}
        popover='auto'
        id='mydiv'
      >
        <h2>Popover</h2>
        <hr />
        <p>A popover is an element that is placed on top of everything else.</p>
        <p>It can be used when you want to tell something important.</p>
        <button popoverTarget='mydiv' popoverTargetAction='hide'>
          Close
        </button>
      </div>
    </>
  );
}
