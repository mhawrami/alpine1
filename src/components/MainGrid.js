'use client';

import { useState, useRef } from 'react';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Intro from '@/components/Intro';
import Nav from '@/components/Nav';
import Portrait from '@/components/Portrait';
import Socials from '@/components/Socials';
import Work from '@/components/Work';
import { useGlobalTimeline } from '@/hooks/useAnimation';
import LoadingBar from '@/components/LoadingBar';
import { useLocalizedData } from '@/context/LanguageContext'; // Importiere den Hook
import { DISABLE_LOADING_ANIMATION } from '@/config';

export default function MainGrid() {
  const [loaded, setLoaded] = useState(DISABLE_LOADING_ANIMATION);
  const tl = useGlobalTimeline(loaded);

  // State for toggling Impressum text
  const [isImpressumActive, setIsImpressumActive] = useState(false);

  // Lokalisierte Daten holen
  const navData = useLocalizedData('nav');
  const introData = useLocalizedData('intro');
  const portraitData = useLocalizedData('portrait');
  const aboutData = useLocalizedData('about');
  const contactData = useLocalizedData('contact');
  const workData = useLocalizedData('work');
  const socialsData = useLocalizedData('socials');

  // Ref for the About section
  const aboutRef = useRef(null);

  // Function to toggle Impressum state
  const toggleImpressum = () => {
    setIsImpressumActive(!isImpressumActive);

    // Scroll to the About section
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Impressum content styled with Tailwind
  const impressumDetails = `
    <div class="p-4">
      <div class="mb-4">
        <b class="block text-sm font-medium">Alpine Development, vertreten durch:</b>
        <p class="text-sm">Mohammed Hawrami<br>Sankt-Veit-Str. 26<br>81673 München</p>
      </div>
      <div class="mb-4">
        <b class="block text-sm font-medium">Kontakt:</b>
        <p class="text-sm">
          <b>Telefon:</b> (089) 5591 6536<br>
          <b>E-Mail:</b> info@alpine-dev.de
        </p>
      </div>
    </div>
  `;

  return (
    <>
      {!DISABLE_LOADING_ANIMATION && (
        <LoadingBar onFinish={() => setLoaded(true)} />
      )}

      {/* Bento Grid */}
      <div className='grid h-screen max-h-[75rem] min-h-[50rem] grid-cols-12 grid-rows-10 gap-4 p-4 max-lg:h-auto max-lg:max-h-none max-lg:grid-rows-none max-lg:py-6'>
        <div className='col-span-full row-span-1'>
          <Nav data={navData} timeline={tl} />
        </div>

        {/* Left column */}
        <div className='col-span-8 row-span-9 grid grid-cols-subgrid grid-rows-subgrid max-lg:col-span-full max-lg:grid-rows-none max-lg:gap-4'>
          <div className='col-span-5 row-span-5 max-lg:col-span-8 max-md:col-span-full'>
            <Intro data={introData} timeline={tl} />
          </div>

          <div className='col-span-3 row-span-5 max-lg:col-span-4 max-md:col-span-full'>
            <Portrait data={portraitData} timeline={tl} />
          </div>

          <div
            ref={aboutRef} // Attach the ref to the About section
            className='col-span-4 row-span-4 max-lg:col-span-6 max-lg:min-h-[20rem] max-md:col-span-full'
          >
            {/* Pass toggled Impressum content to About component */}
            <About
              data={{
                ...aboutData,
                text: isImpressumActive ? impressumDetails : aboutData?.text,
              }}
              timeline={tl}
              isImpressumActive={isImpressumActive}
            />
          </div>

          <div className='col-span-4 row-span-4 max-lg:col-span-6 max-lg:min-h-[20rem] max-md:hidden'>
            <Contact data={contactData} timeline={tl} />
          </div>
        </div>

        {/* Right column */}
        <div className='col-span-4 row-span-9 grid grid-cols-subgrid grid-rows-subgrid max-lg:col-span-full max-lg:grid-rows-none max-lg:gap-4'>
          <div className='col-span-4 row-span-8 max-lg:col-span-full'>
            <Work data={workData} timeline={tl} />
          </div>

          <div className='col-span-full hidden max-lg:min-h-[20rem] max-md:block'>
            <Contact data={contactData} timeline={tl} />
          </div>

          <div className='col-span-4 row-span-1 max-lg:col-span-full max-lg:min-h-[5rem]'>
            {/* Pass toggle handler to Socials */}
            <Socials
              data={socialsData}
              timeline={tl}
              onImpressumClick={toggleImpressum}
              isImpressumActive={isImpressumActive}
            />
          </div>
        </div>
      </div>
    </>
  );
}
