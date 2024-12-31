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

  const [isImpressumActive, setIsImpressumActive] = useState(false);

  const aboutRef = useRef(null);

  const toggleImpressum = () => {
    setIsImpressumActive(!isImpressumActive);
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

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

      <div className='grid h-screen max-h-[75rem] min-h-[50rem] grid-cols-12 grid-rows-10 gap-4 p-4 max-lg:h-auto max-lg:max-h-none max-lg:grid-rows-none max-lg:py-6'>
        <div className='col-span-full row-span-1'>
          <Nav data={data?.nav} timeline={tl} />
        </div>

        <div className='col-span-8 row-span-9 grid grid-cols-subgrid grid-rows-subgrid max-lg:col-span-full max-lg:grid-rows-none max-lg:gap-4'>
          <div className='col-span-5 row-span-5 max-lg:col-span-8 max-md:col-span-full'>
            <Intro data={data?.intro} timeline={tl} />
          </div>

          <div className='col-span-3 row-span-5 max-lg:col-span-4 max-md:col-span-full'>
            <Portrait data={data?.portrait} timeline={tl} />
          </div>

          <div
            ref={aboutRef}
            className='col-span-4 row-span-4 max-lg:col-span-6 max-lg:min-h-[20rem] max-md:col-span-full'
          >
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

        <div className='col-span-4 row-span-9 grid grid-cols-subgrid grid-rows-subgrid max-lg:col-span-full max-lg:grid-rows-none max-lg:gap-4'>
          <div className='col-span-4 row-span-8 max-lg:col-span-full'>
            <Work data={data?.work} timeline={tl} />
          </div>

          <div className='col-span-full hidden max-lg:min-h-[20rem] max-md:block'>
            <Contact data={data?.contact} timeline={tl} />
          </div>

          <div className='col-span-4 row-span-1 max-lg:col-span-full max-lg:min-h-[5rem]'>
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
