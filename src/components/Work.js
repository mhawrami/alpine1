import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Box from './Box';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

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

function ProjectItem({ project, index, animate = true }) {
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    if (!animate || !itemRef.current) return;
    
    gsap.fromTo(
      itemRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }, [index, animate]);

  if (!project?.url) return null;

  // Verify the media exists
  const mediaSrc = availableWorkImages.includes(project.media) 
    ? project.media 
    : availableWorkImages[0]; // Fallback to first image if not found

  try {
    const url = new URL(project.url);
    const domain = url.hostname.replace('www.', '');

    return (
      <div 
        ref={itemRef}
        className='project-item group relative overflow-hidden rounded-xl bg-white/5 transition-all duration-300 hover:bg-white/10 hover:shadow-lg transform hover:-translate-y-1 will-change-transform'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ opacity: 0 }} // Start hidden, will be animated in
      >
        {/* Project Thumbnail */}
        <div className='relative aspect-[16/9] w-full overflow-hidden'>
          <Image
            src={mediaSrc}
            alt={project.title}
            fill
            className='h-full w-full transform object-cover transition-transform duration-700 group-hover:scale-105'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            quality={85}
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAExgF4q6tRTQAAAABJRU5ErkJggg=='
            onError={(e) => {
              console.error(`Failed to load image: ${mediaSrc}`);
              e.target.src = availableWorkImages[0]; // Fallback to first image on error
            }}
          />
          
          {/* Overlay */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
        </div>

        {/* Project Info */}
        <div className='p-6'>
          <div className='flex items-start justify-between'>
            <h3 className='text-xl font-medium text-white transition-colors duration-200 group-hover:text-amber-100'>
              {project.title}
            </h3>
            
            <a
              href={project.url}
              target='_blank'
              rel='noopener noreferrer'
              className='flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-white/20 hover:text-amber-300'
              aria-label={`Visit ${project.title}`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5 rotate-[-45deg] transform transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M14 5l7 7m0 0l-7 7m7-7H3'
                />
              </svg>
            </a>
          </div>
          
          <div className='mt-2 flex items-center space-x-2'>
            <span className='text-sm text-gray-400'>{domain}</span>
            <span className='text-gray-600'>•</span>
            <a 
              href={project.url} 
              target='_blank' 
              rel='noopener noreferrer'
              className='text-sm font-medium text-amber-400 hover:underline hover:text-amber-300 transition-colors'
            >
              Visit Site
            </a>
          </div>
        </div>
      </div>
    );
  } catch (e) {
    console.error('Invalid URL:', project.url);
    return null;
  }
}

export default function Work({ data, timeline }) {
  const [isMounted, setIsMounted] = useState(false);
  
  // Log whenever data changes
  useEffect(() => {
    console.log('Work component data updated:', {
      hasData: !!data,
      dataKeys: data ? Object.keys(data) : [],
      projects: data?.projects,
      projectsCount: data?.projects?.length,
      firstProject: data?.projects?.[0]
    });
    
    // Log available work images
    console.log('Available work images:', availableWorkImages);
    
    setIsMounted(true);
  }, [data]);

  const contentAnimation = (delay) => {
    if (!timeline) return;
    
    timeline
      .from('.project-item', { 
        y: 30, 
        opacity: 0, 
        stagger: 0.1,
        ease: 'power2.out',
        duration: 0.6
      }, delay);
  };

  // Debug: Log when component renders
  console.log('Rendering Work component', { 
    isMounted, 
    hasProjects: data?.projects?.length > 0,
    projectsCount: data?.projects?.length
  });

  if (!isMounted) {
    return (
      <Box
        timeline={timeline}
        className='-translate-x-full scale-0 py-0 opacity-0'
        callbackAnimation={contentAnimation}
      >
        <div className='relative z-10 size-full overflow-hidden'>
          <div className='mb-8 mt-8'>
            <div className='px-8'>
              <h2 className='font-heading text-4xl font-normal' style={{ color: '#565549', letterSpacing: '0.5px' }}>
                Portfolio
              </h2>
              <div className='mt-3 h-px w-20 bg-gray-400/50'></div>
            </div>
          </div>
          <div className='flex h-64 items-center justify-center'>
            <p className='text-gray-400'>Loading portfolio...</p>
          </div>
        </div>
      </Box>
    );
  }

  if (!data?.projects?.length) {
    console.log('No projects available in data');
    return (
      <Box
        timeline={timeline}
        className='-translate-x-full scale-0 py-0 opacity-0'
        callbackAnimation={contentAnimation}
      >
        <div className='relative z-10 size-full overflow-hidden'>
          <div className='mb-8 mt-8'>
            <div className='px-8'>
              <h2 className='font-heading text-4xl font-normal' style={{ color: '#565549', letterSpacing: '0.5px' }}>
                Portfolio
              </h2>
              <div className='mt-3 h-px w-20 bg-gray-400/50'></div>
            </div>
          </div>
          <div className='flex h-64 items-center justify-center'>
            <p className='text-gray-400'>No projects available</p>
          </div>
        </div>
      </Box>
    );
  }

  console.log('Rendering projects:', data.projects);
  
  const containerRef = useRef(null);

  useEffect(() => {
    // Initialize ScrollTrigger for the container
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  }, []);

  return (
    <section className='relative py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
        <div className='text-center mb-16' ref={containerRef}>
          <h2 className='text-4xl font-heading font-normal text-gray-800 mb-4'>
            Our <span className='text-amber-500'>Work</span>
          </h2>
          <div className='w-20 h-0.5 bg-amber-400 mx-auto'></div>
          <p className='mt-6 text-gray-600 max-w-2xl mx-auto'>
            Explore our portfolio of carefully crafted projects, each designed with precision and attention to detail.
          </p>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4'>
          {data.projects.map((project, index) => (
            <ProjectItem 
              key={`${project.title}-${index}`}
              project={project}
              index={index}
              animate={isMounted}
            />
          ))}
        </div>
        
        <div className='mt-16 text-center'>
          <button className='px-8 py-3 bg-amber-500 text-white rounded-full font-medium hover:bg-amber-600 transition-colors duration-300 transform hover:scale-105'>
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}
