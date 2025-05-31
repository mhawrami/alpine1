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
        className='group relative h-full flex flex-col bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:bg-white/5 hover:shadow-sm hover:-translate-y-0.5 border border-white/5 hover:border-white/10 active:scale-[0.98] active:opacity-90' // Simplified hover
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Project Image */}
        <div className='relative aspect-[4/3] sm:aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-[#565549]/5 to-[#d8cfbc]/5'>
          <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10' />
          
          <Image
            src={mediaSrc}
            alt={project.title}
            fill
            className={`object-cover transition-all duration-400 ease-out ${isHovered ? 'scale-105' : 'scale-100'} group-active:scale-100`}
            sizes='(max-width: 768px) 100vw, 50vw'
            priority={index < 4}
          />
          
          {/* Enhanced Hover Overlay */}
          <div className='absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30'>
            <div className='bg-white text-[#565549] text-xs px-4 py-2 rounded-full font-medium shadow-sm border border-white/20'>
              View Project
            </div>
          </div>
        </div>

        {/* Project Info (Always visible) */}
        <div className='p-4 flex-1 flex flex-col'>
          <h3 className='font-serif text-base sm:text-lg text-[#565549] leading-snug line-clamp-2 mb-1'>{project.title}</h3>
          <div className='mt-auto pt-2 border-t border-[#565549]/5'>
            <div className='text-xs text-[#565549]/50 font-sans tracking-wide truncate'>
              {domain}
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
          Selected Works
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
