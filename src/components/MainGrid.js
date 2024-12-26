"use client";

import { useState } from 'react';
import { gsap } from 'gsap';
import Nav from './Nav';

export default function MainGrid({ data }) {
  const [isImpressum, setIsImpressum] = useState(false);

  const toggleContent = () => {
    const textContainer = document.querySelector('.dynamic-text');

    // Ensure `gsap` animations run on the client
    if (typeof window !== 'undefined') {
      const timeline = gsap.timeline();
      timeline.to(textContainer, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setIsImpressum(prev => !prev); // Toggle the state
          timeline.to(textContainer, { opacity: 1, duration: 0.5 });
        },
      });
    } else {
      setIsImpressum(prev => !prev);
    }
  };

  const aboutMeText =
    'Ich bin Moe und dein Partner für alles rund um Webentwicklung, Design und IT-Consulting. Mein Ziel ist es, dich mit modernen und nachhaltigen IT-Lösungen zu unterstützen, damit dein Business auf die nächste Stufe gehoben wird';
  const impressumText = 'Hier stehen die Impressum-Informationen deines Unternehmens.';

  return (
    <div className='main-grid w-full h-full flex items-center justify-center'>
      <div className='dynamic-text text-center max-w-2xl'>
        <p>{isImpressum ? impressumText : aboutMeText}</p>
      </div>
      <Nav toggleContent={toggleContent} isImpressum={isImpressum} data={data} />
    </div>
  );
}
