'use client';
import React, { useState, useRef, useMemo } from 'react';

export default function TextSeeMore(props) {
  const { text, linesLimit = 6, lengthLimit = 840 } = props;

  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const isExceed = text.split('\n').length > linesLimit || text.length > lengthLimit;
  const formatedText = useMemo(() => {
    let formatedText = text;
    if (formatedText.split('\n').length > linesLimit) {
      //check lines
      formatedText = text.split('\n').slice(0, linesLimit).join('\n');

    }
    if (formatedText.length > lengthLimit) {
      //check length
      formatedText = formatedText.substring(0, lengthLimit);
    }
    return formatedText;
  }, [text]);

  return (
    <p className={`${props.className}`}>
      {isExceed ? (
        <>
          {showMore ? text : formatedText}
          <button onClick={toggleShowMore} className='ms-1 text-[--main-clr] hover:text-rose-400'>
            {showMore ? 'less...' : 'more...'}
          </button>
        </>
      ) : (
        text
      )}
    </p>
  );
}
