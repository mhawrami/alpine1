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
import { DISABLE_LOADING_ANIMATION } from '@/config';

export default function MainGrid({ data = {} }) {
  const [loaded, setLoaded] = useState(DISABLE_LOADING_ANIMATION);
  const tl = useGlobalTimeline(loaded);

  // State for toggling Impressum text
  const [isImpressumActive, setIsImpressumActive] = useState(false);

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
      <div className='grid h-auto min-h-screen max-h-screen grid-cols-12 grid-rows-[auto_1fr] gap-4 p-4 max-lg:grid-rows-none max-lg:py-6'>
        <div className='col-span-full'>
          <Nav data={data?.nav} timeline={tl} />
        </div>

        {/* Left column */}
        <div className='col-span-8 grid grid-cols-subgrid grid-rows-subgrid max-lg:col-span-full max-lg:gap-4'>
          <div className='col-span-5 max-lg:col-span-8 max-md:col-span-full'>
            <Intro data={data?.intro} timeline={tl} />
          </div>

          <div className='col-span-3 max-lg:col-span-4 max-md:col-span-full'>
            <Portrait data={data?.portrait} timeline={tl} />
          </div>

          <div
            ref={aboutRef} // Attach the ref to the About section
            className='col-span-4 row-span-4 max-lg:col-span-6 max-lg:min-h-[20rem] max-md:col-span-full'
          >
            {/* Pass toggled Impressum content to About component */}
            <About
              data={{
                ...data?.about,
                text: isImpressumActive ? impressumDetails : data?.about?.text,
              }}
              timeline={tl}
              isImpressumActive={isImpressumActive}
            />
          </div>

          <div className='col-span-4 row-span-4 max-lg:col-span-6 max-lg:min-h-[20rem] max-md:hidden'>
            <Contact data={data?.contact} timeline={tl} />
          </div>
        </div>

        {/* Right column */}
        <div className='col-span-4 grid grid-cols-subgrid grid-rows-[1fr_auto] max-lg:col-span-full max-lg:gap-4'>
          <div className='col-span-4 max-lg:col-span-full h-full min-h-[30rem]'>
            <Work data={data?.work} timeline={tl} />
          </div>

          <div className='col-span-full hidden max-lg:min-h-[20rem] max-md:block'>
            <Contact data={data?.contact} timeline={tl} />
          </div>

          <div className='col-span-4 row-span-1 max-lg:col-span-full max-lg:min-h-[5rem]'>
            {/* Pass toggle handler to Socials */}
            <Socials
              data={data?.socials}
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
