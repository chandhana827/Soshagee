
import React from 'react';

const SadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.182 16.318A4.486 4.486 0 0012 15.75a4.486 4.486 0 00-3.182.568M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c.18-.592.324-1.2.44-1.837M14.25 9.75c-.116.637-.26 1.245-.44 1.837"
    />
  </svg>
);

export default SadIcon;
