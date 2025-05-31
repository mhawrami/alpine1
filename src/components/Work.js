import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useBoxAnimation } from '@/hooks/useAnimation';

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

    return (
      <div 
        ref={itemRef}
        className='group relative h-full flex flex-col bg-[#d8cfbc] border border-[#565549]/10 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 hover:border-[#565549]/20'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Project Thumbnail */}
        <div className='relative aspect-[4/3] w-full overflow-hidden bg-[#565549]/10'>
          <Image
            src={mediaSrc}
            alt={project.title}
            fill
            className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
            sizes='(max-width: 768px) 100vw, 50vw'
            quality={85}
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAExgF4q6tRTQAAAABJRU5ErkJggg=='
            onError={(e) => {
              console.error(`Failed to load image: ${mediaSrc}`);
              e.target.src = availableWorkImages[0];
            }}
          />
          
          {/* Hover Overlay */}
          <div className={`absolute inset-0 bg-[#565549]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center`}>
            <span className='inline-flex items-center text-white text-sm font-medium bg-black/60 px-3 py-1.5 rounded-full'>
              <span>View Project</span>
              <svg className='ml-1.5 w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
              </svg>
            </span>
          </div>
        </div>

        {/* Project Info */}
        <div className='p-4 flex-1 flex flex-col'>
          <h3 className='font-medium text-[#565549] line-clamp-2 mb-2'>{project.title}</h3>
          <div className='mt-auto pt-3 border-t border-[#565549]/10'>
            <div className='flex items-center text-sm text-[#565549]/80'>
              <svg className='w-3.5 h-3.5 mr-1.5 flex-shrink-0' fill='none' stroke='#565549' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1' />
              </svg>
              <span className='truncate'>{domain}</span>
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
  
  useGSAP(() => {
    if (!timeline) return;
    
    // Reset initial state
    gsap.set([titleRef.current, ...itemsRef.current].filter(Boolean), { 
      opacity: 0, 
      y: 20 
    });
    
    // Animate title
    timeline.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.4, 
        ease: 'power2.out' 
      },
      '+=0.1' // Small delay after box appears
    );

    // Animate project items with a staggered delay
    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      
      timeline.fromTo(
        item,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.4,
          ease: 'power2.out' 
        },
        `-=${0.3 - (index * 0.05)}` // Staggered start times
      );
    });
  }, { scope: containerRef, dependencies: [timeline, projects] });

  return (
    <div ref={containerRef} className='h-full overflow-y-auto pr-2'>
      <div ref={titleRef} className='opacity-0 mb-8'>
        <h2 className='text-2xl font-medium text-[#565549]'>
          Portfolio
        </h2>
        <div className='mt-2 h-px w-12 bg-[#565549]/30'></div>
      </div>
      
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {projects.map((project, index) => (
          <div 
            key={`${project.title}-${index}`}
            ref={el => itemsRef.current[index] = el}
            className='opacity-0'
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
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const boxRef = useRef(null);
  
  // Initialize component and set mounted state
  useEffect(() => {
    setIsMounted(true);
    
    return () => {
      // Clean up GSAP instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  // Use the box animation hook
  useBoxAnimation(timeline, () => {
    // Box animation is handled by useBoxAnimation
  }, 0.7);
  
  // Animate the box appearance
  useGSAP(() => {
    if (!timeline || !boxRef.current) return;
    
    // Reset initial state
    gsap.set(boxRef.current, { 
      opacity: 0,
      y: 20
    });
    
    // Animate the box in
    timeline.to(boxRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      delay: 0.1 // Slight delay after the box animation starts
    });
  }, { scope: boxRef, dependencies: [timeline] });
  
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

  return (
    <div className='h-full flex flex-col bg-[#d8cfbc] p-4'>
      <div ref={boxRef} className='h-full'>
        <WorkContent projects={projects} timeline={timeline} />
      </div>
    </div>
  );
}
