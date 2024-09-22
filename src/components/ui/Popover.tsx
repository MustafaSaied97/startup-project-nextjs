import React from 'react';

export default function Popover() {
  return (
    <>
      <button popoverTarget='mydiv'>Popover</button>
      <div className=' fixed m-auto rounded-md bg-gray-300 p-6 backdrop:bg-slate-950/10' popover='auto' id='mydiv'>
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
