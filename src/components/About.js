import Image from 'next/image';
import Box from './Box';
import { useLocalizedData } from '@/context/LanguageContext'; // Importiere den Hook

export default function About({ timeline, isImpressumActive }) {
  const data = useLocalizedData('about'); // Hole die lokalisierten Daten für "about"

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
         
