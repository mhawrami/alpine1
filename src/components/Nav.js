import Box from './Box';
import { useContext } from 'react';
import { LanguageContext, useLocalizedData } from '@/context/LanguageContext'; // Hook importieren

export default function Nav({ timeline }) {
  const { language, setLanguage } = useContext(LanguageContext);

  // Lokalisierte Daten aus dem Kontext abrufen
  const data = useLocalizedData('nav');

  const contentAnimation = delay => {
    timeline
      .from('.logo', { x: -30, opacity: 0 }, delay + 0.3)
      .from('.cta', { x: 30, opacity: 0 }, delay + 0.3);
  };

  const handleLanguageChange = lang => {
    setLanguage(lang);
  };

  return (
    <Box
      timeline={timeline}
      className='translate-y-full scale-0 opacity-0'
      callbackAnimation={contentAnimation}
    >
      <nav className='flex size-full items-center justify-between max-lg:gap-4 max-md:flex-col max-md:justify-center'>
        {/* Logo */}
        <div className='logo overflow-hidden font-heading text-2xl font-normal'>
          <span className='block'>{data?.logo}</span>
        </div>

        {/* Call-to-Action Buttons und Sprachumschalter */}
        <div className='cta flex items-center gap-4'>
          {/* Links */}
          {data?.links?.map(link => (
            <a
              key={link.title}
              href={link.url}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-block'
            >
              <button className='rounded-xl border border-secondary bg-secondary px-4 py-3 pt-3.5 font-medium uppercase text-primary'>
                {link.title}
              </button>
            </a>
          ))}

          {/* Sprachumschalter */}
          <div className='language-switcher flex items-center gap-2'>
            <button
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                language === 'de' ? 'bg-primary text-secondary' : 'bg-secondary text-primary'
              }`}
              onClick={() => handleLanguageChange('de')}
            >
              DE
            </button>
            <button
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                language === 'en' ? 'bg-primary text-secondary' : 'bg-secondary text-primary'
              }`}
              onClick={() => handleLanguageChange('en')}
            >
              EN
            </button>
          </div>
        </div>
      </nav>
    </Box>
  );
}
