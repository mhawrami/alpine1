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

        {/* Dynamic Content */}
        <div className='about-text-wrapper'>
          {isImpressumActive ? (
            <div className='impressum-content'>
              <h3>Impressum</h3>
              <br />
              <b>Vertreten durch:</b>
              <p>
                Mohammed Hawrami<br />
                Sankt-Veit-Str. 26<br />
                81673 München
              </p>
              <br />
              <b>Kontakt:</b>
              <br />
              <b>Telefon:</b> (089) 5591 6536<br />
              <b>E-Mail:</b> info@alpine-dev.de<br />
              <b>Rechtsform:</b> Einzelunternehmen<br />
              Inhaltlich Verantwortlicher gemäß § 18 Abs. 2 MStV: Mohammed
              Hawrami
            </div>
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
