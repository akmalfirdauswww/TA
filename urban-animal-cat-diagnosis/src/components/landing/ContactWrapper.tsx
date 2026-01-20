'use client';

import dynamic from 'next/dynamic';

// Dynamically import Contact component to avoid SSR issues with react-leaflet
const Contact = dynamic(() => import('@/components/landing/Contact'), {
  ssr: false,
});

const ContactWrapper = () => {
  return <Contact />;
};

export default ContactWrapper;
