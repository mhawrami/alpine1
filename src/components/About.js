import Image from 'next/image';
import Box from './Box';

export default function About({ data, timeline, isImpressumActive }) {
  const contentAnimation = delay => {
    const offset = 0.3;
    timeline
      .from('.about-text', { opacity: 0, y: 30, duration: 0.8 }, delay + offset)
      .from(
        '.about-icon',
        { opacity: 0, rotate: 180, duration: 1, ease: 'slow.out' },
        delay + offset
      );
  };

  return (
    <Box
      timeline={timeline}
      className='-translate-y-full scale-0 opacity-0'
      callbackAnimation={contentAnimation}
    >
      <div className='flex h-full flex-col'>
        {/* Icon - Fixed at top */}
        <div className='size-[2.75rem] flex-shrink-0'>
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

        {/* Spacer to push content down */}
        <div className='flex-1 min-h-4'></div>

        {/* Dynamic Content - Fixed at bottom */}
        <div className='about-text-wrapper flex-shrink-0'>
          {isImpressumActive ? (
            <div 
              className='impressum-content max-h-[calc(100%-4rem)] overflow-y-auto pr-2 text-sm leading-relaxed text-gray-800'
              dangerouslySetInnerHTML={{ __html: data?.text }}
            />
          ) : (
            <p className='about-text max-w-[25rem] pb-2 text-lg leading-[135%]'>
              {data?.text}
            </p>
          )}
        </div>
      </div>
    </Box>
  );
}
