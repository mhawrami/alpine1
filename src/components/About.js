"use client"; // Ensures the component runs on the client side

import { useState } from 'react';
import Image from 'next/image';
import Box from './Box';

export default function About({ data, timeline, nav }) {
  const [showImprint, setShowImprint] = useState(false);

  const contentAnimation = (delay) => {
    const offset = 0.3;
    timeline
      ?.from('.about-text', { opacity: 0, y: 30, duration: 0.8 }, delay + offset)
      ?.from(
        '.about-icon',
        { opacity: 0, rotate: 180, duration: 1, ease: 'slow.out' },
        delay + offset
      );
  };

  const handleToggleText = (e) => {
    e.preventDefault(); // Prevent default link behavior
    setShowImprint(!showImprint);
  };

  const impressumLink = nav?.links?.find((link) => link.title === 'Impressum');

  return (
    <Box
      timeline={timeline}
      className='-translate-y-full scale-0 opacity-0'
      callbackAnimation={contentAnimation}
    >
      <div className='flex size-full flex-col justify-between gap-4'>
        {/* Icon */}
        <div className='size-[2.75rem]'>
          {data?.icon && (
            <Image
              src={data.icon}
              width={48}
              height={48}
              alt='disk'
              className='about-icon size-full'
            />
          )}
        </div>

        {/* Text with dynamic content */}
        <p className='about-text max-w-[25rem] pb-2 text-lg leading-[135%]'>
          {showImprint
            ? 'Your company imprint information goes here.'
            : data?.text}
        </p>

        {/* Toggle Link */}
        {impressumLink && (
          <a
            href={impressumLink.url || '#'}
            onClick={handleToggleText}
            className='text-blue-500 underline hover:text-blue-700'
          >
            {showImprint ? 'Über mich' : impressumLink.title}
          </a>
        )}
      </div>
    </Box>
  );
}
