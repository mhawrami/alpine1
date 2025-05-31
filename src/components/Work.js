import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Box from './Box';

// Register plugins
gsap.registerPlugin(ScrollTrigger, useGSAP);

const availableWorkImages = [
  '/work1.jpg',
  '/work2.jpg',
  '/work3.jpg',
  '/work4.jpg',
  '/work5.jpg',
  '/work6.jpg',
  '/work7.jpg',
  '/work8.jpg'
];

// Animation variants for framer-motion like API
const fadeInUp = {
  hidden: { y: 40, opacity: 0 },
  visible: (i = 0) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

function ProjectItem({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef(null);

  if (!project?.url) return null;

  // Verify the media exists
  const mediaSrc = availableWorkImages.includes(project.media) 
    ? project.media 
    : availableWorkImages[0];

  try {
    const url = new URL(project.url);
    const domain = url.hostname.replace('www.', '');
    const isExternal = !url.hostname.includes(window.location.hostname);

    return (
      <div 
        ref={itemRef}
        className='group relative h-full flex flex-col bg-white/3 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-400 hover:bg-white/5 hover:shadow-[0_8px_30px_rgba(86,85,73,0.05)] hover:-translate-y-1 border border-white/5 hover:border-white/10 active:scale-[0.98] active:opacity-90 transform-gpu will-change-transform' // Premium hover effects
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Kunde Badge - Always show for all projects */}
        <div className='absolute top-3 right-3 z-20'>
          <div className='bg-[#565549] text-white text-[10px] font-medium uppercase tracking-wider px-2 py-1 rounded-full'>
            Kunde
          </div>
        </div>
        {/* Project Image */}
        <div className='relative aspect-[4/3] sm:aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-[#565549]/5 to-[#d8cfbc]/5'>
          {/* Subtle gradient overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10' />
          
          {/* Image with subtle zoom effect */}
          <div className='relative w-full h-full overflow-hidden'>
            <Image
              src={mediaSrc}
              alt={project.title}
              fill
              className={`object-cover transition-all duration-700 ease-out ${isHovered ? 'scale-110' : 'scale-100'} group-active:scale-100`}
              sizes='(max-width: 768px) 100vw, 50vw'
              priority={index < 4}
            />
          </div>
          
          {/* Premium hover overlay */}
          <a 
            href={project.url}
            target='_blank'
            rel='noopener noreferrer'
            className='absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-t from-black/70 via-black/30 to-transparent'
          >
            <div className='flex flex-col items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500'>
              <div className='bg-[#d8cfbc] text-[#565549] text-sm px-6 py-3 rounded-full font-medium shadow-lg border-2 border-white/40 hover:bg-[#d8cfbc]/95 transition-all duration-300 hover:scale-105'>
                Website öffnen
              </div>
              {project.year && (
                <span className='mt-3 text-sm text-white/90 font-medium tracking-wide'>
                  {project.year}
                </span>
              )}
            </div>
          </a>
        </div>

        {/* Project Info (Always visible) */}
        <div className='p-5 sm:p-6 flex-1 flex flex-col relative overflow-hidden'>

          <div className='relative z-10'>
            <div className='flex items-start justify-between'>
              <h3 className='font-serif text-lg text-[#565549] leading-tight mb-1.5 group-hover:text-[#565549]/90 transition-colors duration-300'>
                {project.title}
              </h3>
              <div className='flex-shrink-0 text-[#565549]/30 group-hover:text-[#565549]/50 transition-colors duration-300 ml-2 mt-0.5'>
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'>
                  <path d='M7 7h10v10' />
                  <path d='M7 17 17 7' />
                </svg>
              </div>
            </div>
            {project.client && (
              <div className='text-sm text-[#565549]/70'>
                <span className='font-medium'>{project.client}</span>
              </div>
            )}
          </div>
          <div className='mt-auto pt-3 border-t border-[#565549]/5 group-hover:border-[#565549]/10 transition-colors duration-300'>
            <div className='flex items-center justify-between'>
              <span className='text-xs text-[#565549]/60 font-sans tracking-wide truncate pr-2'>
                {domain}
              </span>
              {project.tags && (
                <span className='flex-shrink-0 text-[10px] text-[#565549]/40 group-hover:text-[#565549]/60 transition-colors'>
                  {project.tags}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* External Link */}
        <a
          href={project.url}
          target='_blank'
          rel='noopener noreferrer'
          className='absolute inset-0 z-10'
          aria-label={`Visit ${project.title} (opens in new tab)`}
          onClick={(e) => {
            // Add click animation
            const el = e.currentTarget;
            el.style.transform = 'scale(0.98)';
            setTimeout(() => {
              el.style.transform = '';
            }, 150);
          }}
        />
      </div>
    );
  } catch (e) {
    console.error('Invalid URL:', project.url);
    return null;
  }
}

function WorkContent({ projects, timeline }) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const itemsRef = useRef([]);
  
  const contentAnimation = (delay = 0) => {
    if (!timeline) return;
    
    // Animate title with a slight delay
    timeline.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        ease: 'power2.out' 
      },
      delay + 0.3
    );

    // Animate project items with a staggered delay
    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      
      timeline.fromTo(
        item,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          ease: 'power2.out' 
        },
        delay + 0.3 + (index * 0.1) // Staggered start times
      );
    });
  };
  
  // Set initial state
  useGSAP(() => {
    if (!timeline) return;
    gsap.set([titleRef.current, ...itemsRef.current].filter(Boolean), { 
      opacity: 0, 
      y: 30 
    });
  }, { scope: containerRef });
  
  // Trigger animations when timeline is ready
  useEffect(() => {
    if (timeline) {
      contentAnimation();
    }
  }, [timeline]);

  return (
    <div ref={containerRef} className='h-full overflow-y-auto pr-1 sm:pr-2'>
      <div className='mb-8 sm:mb-12 px-4 sm:px-0'>
        <span className='block text-xs sm:text-sm uppercase tracking-widest text-[#565549]/60 mb-1.5 sm:mb-2'>Portfolio</span>
        <h2 
          ref={titleRef} 
          className='text-3xl sm:text-4xl md:text-5xl font-serif text-[#565549] mb-3 sm:mb-4 leading-tight tracking-tight'>
          Betreute Kunden
        </h2>
        <div className='w-12 sm:w-16 h-0.5 bg-[#565549]/30 mb-4 sm:mb-6'></div>
      </div>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-0'>
        {projects.map((project, index) => (
          <div 
            key={`${project.title}-${index}`}
            ref={el => itemsRef.current[index] = el}
            className='opacity-0 transition-opacity duration-300'
          >
            <ProjectItem 
              project={project}
              index={index}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Work({ data, timeline }) {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef(null);
  
  // Initialize component and set mounted state
  useEffect(() => {
    setIsMounted(true);
    
    return () => {
      // Clean up GSAP instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Memoize projects to prevent unnecessary re-renders
  const projects = useMemo(() => data?.projects || [], [data?.projects]);
  
  if (!isMounted) return null;

  if (!data?.projects?.length) {
    return (
      <div className='h-full flex items-center justify-center p-4 bg-[#d8cfbc]'>
        <p className='text-[#565549]/70'>No projects available</p>
      </div>
    );
  }

  // Content animation function
  const contentAnimation = (delay = 0) => {
    if (!timeline) return;
    timeline.to(containerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, delay);
  };

  return (
    <Box 
      timeline={timeline}
      className='-translate-y-full scale-0 opacity-0 bg-[#d8cfbc] p-4'
      callbackAnimation={contentAnimation}
    >
      <div ref={containerRef} className='h-full'>
        <WorkContent projects={projects} timeline={timeline} />
      </div>
    </Box>
  );
}
