'use client';

import { useState } from 'react';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Intro from '@/components/Intro';
import Nav from '@/components/Nav';
import Portrait from '@/components/Portrait';
import Socials from '@/components/Socials';
import Work from '@/components/Work';
import LoadingBar from '@/components/LoadingBar';
import { DISABLE_LOADING_ANIMATION } from '@/config';

export default function MainGrid({ data = {} }) {
  const [loaded, setLoaded] = useState(DISABLE_LOADING_ANIMATION);
  const [language, setLanguage] = useState('de'); // Standard: Deutsch
  const [dynamicData, setDynamicData] = useState(data);

  // Sprachwechsel-Handler
  const handleLanguageChange = async lang => {
    setLanguage(lang);
    const updatedData = await fetch(`/src/data.${lang}.json`).then(res => res.json());
    setDynamicData(updatedData);
  };

  return (
    <>
      {!DISABLE_LOADING_ANIMATION && (
        <LoadingBar onFinish={() => setLoaded(true)} />
      )}
      <div className='grid h-screen max-h-[75rem] min-h-[50rem] grid-cols-12 grid-rows-10 gap-4 p-4 max-lg:h-auto max-lg:max-h-none max-lg:grid-rows-none max-lg:py-6'>
        <div className='col-span-full row-span-1'>
          <Nav data={dynamicData?.nav} timeline={tl} onLanguageChange={handleLanguageChange} />
        </div>
        <div className='col-span-4 row-span-5 max-lg:col-span-full'>
          <Intro data={dynamicData?.intro} />
        </div>
        <div className='col-span-4 row-span-5 max-lg:col-span-full'>
          <Portrait data={dynamicData?.portrait} />
        </div>
        <div className='col-span-4 row-span-5 max-lg:col-span-full'>
          <About data={dynamicData?.about} />
        </div>
        <div className='col-span-12 row-span-2'>
          <Work data={dynamicData?.work} />
        </div>
        <div className='col-span-12 row-span-1'>
          <Socials data={dynamicData?.socials} />
        </div>
        <div className='col-span-12 row-span-2'>
          <Contact data={dynamicData?.contact} />
        </div>
      </div>
    </>
  );
}
