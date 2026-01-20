import React from 'react';

const Logo = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.17c0 .55-.45 1-1 1s-1-.45-1-1v-2.17c0-.55.45-1 1-1s1 .45 1 1v2.17zm4 0c0 .55-.45 1-1 1s-1-.45-1-1v-2.17c0-.55.45-1 1-1s1 .45 1 1v2.17zm-2-4.17c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
  </svg>
);

export default Logo;
