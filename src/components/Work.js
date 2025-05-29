import { useState } from 'react';
import Image from 'next/image';
import Box from './Box';

export default function Work({ data, timeline }) {
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
        
        <div className='hide-scrollbar h-[calc(100%-6rem)] overflow-y-auto px-8 pb-12 max-lg:overflow-y-visible'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10'>
            {data?.projects?.map((project, index) => (
              <ProjectItem 
                key={`${project.title}-${index}`}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </Box>
  );
}

const ProjectItem = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!project?.url) return null;

  try {
    const url = new URL(project.url);
    const domain = url.hostname.replace('www.', '');

    return (
      <div 
        className='project-item group relative overflow-hidden rounded-xl bg-white/5 transition-all duration-300 hover:bg-white/10 hover:shadow-lg'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Project Thumbnail */}
        <div className='relative aspect-[16/9] w-full overflow-hidden'>
          <Image
            src={project.media}
            alt={project.title}
            fill
            className='h-full w-full transform object-cover transition-transform duration-700 group-hover:scale-105'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            quality={85}
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAExgF4q6tRTQAAAABJRU5ErkJggg=='
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
};
