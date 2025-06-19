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
      <div className='flex h-full flex-col gap-4'>
        {/* Icon */}
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

        {/* Dynamic Content */}
        <div className='about-text-wrapper flex-1 overflow-hidden'>
          {isImpressumActive ? (
            <div 
              className='impressum-content h-full overflow-y-auto pr-2 text-sm leading-relaxed text-gray-800'
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
