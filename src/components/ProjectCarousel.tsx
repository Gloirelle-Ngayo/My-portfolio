"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';
import ProjectCard from './ProjectCard';

// --- Types ---
interface Project {
  id: string;
  image_url?: string;
  title: string;
  description: string;
  technologies: string[];
  category: 'network' | 'programming';
  project_url?: string;
  objectives: string[];
  completion_date: string;
}

interface IconProps {
  className?: string;
}

interface CardProps {
  card: Project;
  index: number;
  activeIndex: number;
  totalCards: number;
  cardsPerView: number;
}

// --- Helper Components & Icons ---

// A simple substitute for the ChevronLeft icon
const ChevronLeftIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m15 18-6-6 6-6"/></svg>
);

// A simple substitute for the ChevronRight icon
const ChevronRightIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>
);

// --- Main Carousel Component ---
export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(Math.floor(projects.length / 2));
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(1);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const autoplayDelay = 3000; // Autoplay delay in ms

  // Responsive logic
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let perView = 1;

      if (width >= 1024) {
        perView = 5; // Desktop: 5 cards
      } else if (width >= 768) {
        perView = 2; // Tablet: 2 cards (changed from 600px to 768px)
      } else {
        perView = 1; // Mobile: 1 card
      }

      setCardsPerView(perView);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to go to the next slide
  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };
  
  // Set up and clear autoplay interval
  useEffect(() => {
    if (!isPaused) {
      autoplayIntervalRef.current = setInterval(goToNext, autoplayDelay);
    }
    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [isPaused, activeIndex, projects.length]);

  // Function to manually change slide and reset autoplay
  const changeSlide = (newIndex: number) => {
    const newSafeIndex = (newIndex + projects.length) % projects.length;
    setActiveIndex(newSafeIndex);
    // Reset autoplay timer on manual interaction
    if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
    }
    if (!isPaused) {
        autoplayIntervalRef.current = setInterval(goToNext, autoplayDelay);
    }
  };
  
  // Handle drag events to change slides
  const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const dragThreshold = 75; // Increased threshold for a better feel
    const dragOffset = info.offset.x;
    if (dragOffset > dragThreshold) {
      changeSlide(activeIndex - 1); // Drag right
    } else if (dragOffset < -dragThreshold) {
      changeSlide(activeIndex + 1); // Drag left
    }
  };

  return (
    <section className="w-full flex-col items-center justify-center font-sans overflow-hidden">
      <div 
        className="w-full mx-auto p-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative flex w-full flex-col rounded-3xl md:p-6">

          {/* Carousel Container */}
          <div className="relative w-full h-[280px] md:h-[400px] flex items-center justify-center overflow-hidden px-14">
            <motion.div
                  className="w-full h-full flex items-center justify-center"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={onDragEnd}
              >
              {projects.map((project, index) => (
                <CarouselCard
                key={project.id}
                  card={project}
                  index={index}
                  activeIndex={activeIndex}
                  totalCards={projects.length}
                  cardsPerView={cardsPerView}
                />
              ))}
        </motion.div>
      </div>

          {/* Navigation and Indicators */}
          <div className="flex items-center justify-center gap-6 mt-6">
            {/* Previous Button */}
            <button
                  onClick={() => changeSlide(activeIndex - 1)}
                  className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
                  <ChevronLeftIcon className="w-6 h-6" />
            </button>

            {/* Dot Indicators */}
            <div className="flex items-center justify-center gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => changeSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                    activeIndex === index ? 'w-6 bg-pink-400' : 'w-2 bg-gray-300 dark:bg-neutral-600 hover:bg-gray-400 dark:hover:bg-neutral-500'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => changeSlide(activeIndex + 1)}
              className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Card Component for the Carousel ---
function CarouselCard({ card, index, activeIndex, totalCards, cardsPerView }: CardProps) {
  // Calculate the offset from the active index.
  // The logic handles wrapping around the array for a seamless loop.
  let offset = index - activeIndex;
  if (offset > totalCards / 2) {
    offset -= totalCards;
  } else if (offset < -totalCards / 2) {
    offset += totalCards;
  }
  
  // Determine visibility based on offset and cardsPerView
  const maxVisibleOffset = Math.floor(cardsPerView / 2);
  const isVisible = Math.abs(offset) <= maxVisibleOffset;

  // Define visual properties based on distance from center
  const scale = offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.92 : 0.8;
  const opacity = offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.95 : 0.90;
  const zIndex = 10 - Math.abs(offset);
  const boxShadow = offset === 0 ? '0px 14px 20px rgba(0, 0, 0, 0.1)' : 'none';

  // Calculate card width based on cardsPerView with proper spacing
  const getCardWidth = () => {
    switch (cardsPerView) {
      case 1: return 'w-full';
      case 2: return 'w-[45%]'; // Slightly smaller than 50% to add spacing
      case 5: return 'w-[90%]'; // Smaller than 20% to add spacing between cards
      default: return 'w-1/3';
    }
  };

  // Calculate x offset based on cardsPerView with proper spacing
  const getXOffset = () => {
    switch (cardsPerView) {
      case 1: return 0;
      case 2: return offset * 55; // 55% spacing for 2 cards
      case 5: return offset * 22; // 22% spacing for 5 cards
      default: return offset * 33.33;
    }
  };

  // Define animation properties
  const animate = {
    x: `${getXOffset()}%`,
    scale: scale,
    zIndex: zIndex,
    opacity: isVisible ? opacity : 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 30 }
  };

  return (
    <motion.div
      className={`absolute ${getCardWidth()} h-[95%]`}
      style={{
        transformStyle: 'preserve-3d',
        boxShadow: boxShadow,
      }}
      animate={animate}
      initial={false} // Prevents initial animation on page load
    >
      <ProjectCard project={card} />
    </motion.div>
  );
}





