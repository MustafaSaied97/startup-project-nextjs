'use client';
import React, { useRef } from 'react';

export default function Popover() {
  const popoverRef = useRef<HTMLDivElement>(null);
  const handleClickPopoverBtn = (e: React.MouseEvent<HTMLButtonElement>) => popoverRef.current?.showPopover();
  return (
    <>
      <button popoverTarget='my-div'>Popover</button>
      {/* <button onClick={handleClickPopoverBtn}>ClickPopoverBtn</button> */}
      <details onToggle={() => console.log('hello from details')}>details</details>
      <div
        ref={popoverRef}
        className='popover-animation fixed m-auto rounded-md bg-gray-300 p-6 backdrop:bg-slate-950/10'
        onToggle={() => console.log('hello from details')}
        popover='auto'
        id='my-div'
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
