import React, { ReactElement } from 'react';

function Circle(): ReactElement {
  return (
    <svg height="50%" width="50%" className="absolute overflow-visible mt-1">
      <circle
        cx="35"
        cy="30"
        r="33"
        stroke="white"
        strokeWidth="3"
        fill="none"
        className="absolute"
      />
    </svg>
  );
}

export default Circle;
