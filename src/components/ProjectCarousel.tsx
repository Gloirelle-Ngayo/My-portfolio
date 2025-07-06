import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

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

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [cardWidth, setCardWidth] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const totalCards = projects.length;

  // Gère le redimensionnement pour cartes responsives
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let perView = 1;
      let desktop = false;
  
      if (width >= 1024) {
        perView = 3;
        desktop = true;
      } else if (width >= 480) {
        perView = 2;
      }
  
      setIsDesktop(desktop);
      setCardsPerView(perView);
  
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const adjustedCardWidth = containerWidth / perView;
        setCardWidth(adjustedCardWidth);
      }
    };
  
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Total de "pages" pour pagination intelligente
  const totalPages = Math.max(1, totalCards - cardsPerView + 1);

  const getPaginationNumbers = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i);
    }

    if (currentIndex <= 2) {
      pages.push(0, 1, 2, '...', totalPages - 1);
    } else if (currentIndex >= totalPages - 3) {
      pages.push(0, '...', totalPages - 3, totalPages - 2, totalPages - 1);
    } else {
      pages.push(0, '...', currentIndex, '...', totalPages - 1);
    }

    return pages;
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, totalCards - cardsPerView)));
  };

  const getCardStyle = (index: number) => {
    let isCenter = false;
  
    if (cardsPerView === 1) {
      // Mobile : la seule carte visible
      isCenter = index === currentIndex;
    } else if (cardsPerView === 2) {
      // Tablette : on met en avant la première carte visible
      isCenter = index === currentIndex + 1;
    } else {
      // Desktop : carte du milieu
      const middleIndex = currentIndex + Math.floor(cardsPerView / 2);
      isCenter = index === middleIndex;
    }
  
    return {
      scale: isCenter ? 1 : 0.92,
      opacity: isCenter ? 1 : 0.6,
      zIndex: isCenter ? 10 : 5,
      boxShadow: isCenter ? '0 8px 16px rgba(0,0,0,0.25)' : 'none',
      marginLeft: isCenter && cardsPerView > 1 ? '-5%' : 0,
      marginRight: isCenter && cardsPerView > 1 ? '-5%' : 0,
    };
  };
  
  

  const getScrollPosition = () => {
    return -currentIndex * (cardWidth);
  };

  return (
    <div className="relative w-full overflow-hidden mx-auto max-w-[1000px] flex flex-col items-center">
      <div ref={containerRef} className="w-full overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: getScrollPosition() }}
          transition={{ type: 'spring', stiffness: 60, damping: 20 }}
          style={{ width: totalCards * (cardWidth) }}
        >
          {projects.map((project, index) => {
            const style = getCardStyle(index);
            return (
              <motion.div
                key={project.id}
                className="flex-shrink-0 box-border px-2"
                style={{
                  width: cardWidth,
                  zIndex: isDesktop ? style.zIndex : 1,
                  marginLeft: isDesktop ? style.marginLeft : 0,
                  marginRight: isDesktop ? style.marginRight : 0,
                  boxShadow: isDesktop ? style.boxShadow : 'none',
                }}
                animate={{
                  scale: style.scale,
                  opacity: style.opacity,
                }}
                transition={{ type: 'spring', stiffness: 60, damping: 20 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-1 mt-4 flex-wrap">
        <button
          onClick={() => goToIndex(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>

        {getPaginationNumbers().map((num, i) =>
          typeof num === 'number' ? (
            <button
              key={i}
              onClick={() => goToIndex(num)}
              className={`px-3 py-1 rounded ${
                num === currentIndex ? 'bg-primary text-white' : 'bg-gray-100'
              } hover:bg-primary/80 hover:text-white`}
            >
              {num + 1}
            </button>
          ) : (
            <span key={i} className="px-2 text-gray-500">
              ...
            </span>
          )
        )}

        <button
          onClick={() => goToIndex(currentIndex + 1)}
          disabled={currentIndex >= totalCards - cardsPerView}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}







