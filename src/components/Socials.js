import Box from './Box';

export default function Socials({ data, timeline, onImpressumClick, isImpressumActive }) {
  const contentAnimation = delay => {
    timeline.from(
      '.social-link',
      { yPercent: 100, stagger: 0.18 },
      delay + 0.3
    );
  };

  return (
    <Box
      timeline={timeline}
      className='-translate-y-full scale-0 opacity-0'
      callbackAnimation={contentAnimation}
    >
      <div className='flex size-full items-center justify-evenly gap-2'>
        {data?.links?.map(link => (
          <a
            key={link.title}
            href={link.url}
            target={link.title === 'Impressum' ? undefined : '_blank'}
            rel={link.title === 'Impressum' ? undefined : 'noopener noreferrer'}
            className='flex overflow-hidden text-base font-medium uppercase leading-[100%]'
            onClick={
              link.title === 'Impressum'
                ? e => {
                    e.preventDefault();
                    onImpressumClick();
                  }
                : undefined
            }
          >
            <span className='social-link inline-block'>
              {link.title === 'Impressum' && isImpressumActive ? 'Über mich' : link.title}
            </span>
          </a>
        ))}
      </div>
    </Box>
  );
}
