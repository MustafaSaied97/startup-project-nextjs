'use client';
import React, { useState, useMemo, useEffect } from 'react';

export default function ContactModal({ closeModal=()=>{} }) {

  const handleSubmit = () => {
    //send form data to server
    
    closeModal();
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
      <div onClick={closeModal} className='backdrop fixed z-0 h-screen w-screen bg-gray-500/20 '></div>
      <div className='relative z-10 flex max-h-[70vh] w-[90%] flex-col overflow-y-auto rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none sm:w-[70%] md:w-[60%] lg:w-[50%]'>
        {/* modal header */}
        <div className='flex items-start justify-between rounded-t border-b border-solid border-gray-300 p-5 '>
          <h3 className='font=semibold text-3xl'>Add Modal</h3>
          <button className=' h-6 w-6 rounded-md bg-gray-400 text-center  text-white    hover:bg-gray-200 ' onClick={closeModal}>
            x
          </button>
        </div>
        {/* modal body */}
        <div className='relative flex-auto p-6 '>
          <form className='w-full rounded bg-gray-200 px-8 pb-8 pt-6 shadow-md'>
            {Array(2)
              .fill(null)
              .map((_, i) => (
                <div key={i}>
                  <label className='mb-1 block text-sm font-bold text-black'>City</label>
                  <input className='w-full appearance-none rounded border px-1 py-2 text-black shadow' />
                </div>
              ))}
          </form>
        </div>
        {/* modal footer */}
        <div className=' my-2 flex items-center  justify-end gap-4 rounded-b border-t border-solid p-6'>
          <button className='  h-full w-fit rounded p-2 text-sm font-bold  text-red-500 shadow  hover:shadow-lg ' type='button' onClick={closeModal}>
            Close
          </button>
          <button className='  h-full w-fit rounded p-2 text-sm font-bold  text-blue-500 shadow  hover:shadow-lg ' type='button' onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
