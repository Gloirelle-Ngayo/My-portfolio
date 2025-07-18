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

function getLoopedProjects(projects: Project[], cardsPerView: number) {
  if (projects.length === 0) return [];
  const prefix = projects.slice(-cardsPerView);
  const suffix = projects.slice(0, cardsPerView);
  return [...prefix, ...projects, ...suffix];
}

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [cardWidth, setCardWidth] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isResetting, setIsResetting] = useState(false); // 👉 Flag pour transition instantanée

  const containerRef = useRef<HTMLDivElement>(null);
  const totalCards = projects.length;

  const loopedProjects = getLoopedProjects(projects, cardsPerView);
  const totalLooped = loopedProjects.length;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let perView = 1;
      let desktop = false;

      if (width >= 1024) {
        perView = 5;
        desktop = true;
      } else if (width >= 600) {
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

  useEffect(() => {
    setCurrentIndex(cardsPerView);
  }, [cardsPerView, totalCards]);

  useEffect(() => {
    if (currentIndex < cardsPerView) {
      setIsResetting(true); // 🔁 active instant reset
      setTimeout(() => {
        setCurrentIndex(totalCards + cardsPerView);
        setIsResetting(false); // reset terminé
      }, 0);
    } else if (currentIndex >= totalCards + cardsPerView) {
      setIsResetting(true);
      setTimeout(() => {
        setCurrentIndex(cardsPerView);
        setIsResetting(false);
      }, 0);
    }
  }, [currentIndex, cardsPerView, totalCards]);

  const totalPages = totalCards;

  const getPaginationNumbers = () => {
    const pageIndex = currentIndex - cardsPerView;

    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i);
    if (pageIndex <= 2) {
      return [0, 1, 2, '...', totalPages - 1];
    } else if (pageIndex >= totalPages - 3) {
      return [0, '...', totalPages - 3, totalPages - 2, totalPages - 1];
    } else {
      return [0, '...', pageIndex, '...', totalPages - 1];
    }
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index + cardsPerView);
  };

  const getCardStyle = (index: number) => {
    let centerIndex = currentIndex;
    if (cardsPerView === 2) {
      centerIndex += 1;
    } else if (cardsPerView >= 3) {
      centerIndex += Math.floor(cardsPerView / 2);
    }

    const distance = Math.abs(index - centerIndex);

    const scale = distance === 0 ? 1 : distance === 1 ? 0.92 : 0.85;
    const opacity = distance === 0 ? 1 : distance === 1 ? 0.95 : 0.90;
    const zIndex = 10 - distance;
    const boxShadow = distance === 0 ? '0px 64px 80px rgba(0, 0, 0, 0.15)' : 'none';
    const marginOffset = distance === 0 && cardsPerView > 1 ? '-0.1%' : 0;

    return { scale, opacity, zIndex, boxShadow, marginLeft: marginOffset, marginRight: marginOffset };
  };

  const getScrollPosition = () => {
    return -currentIndex * cardWidth;
  };

  return (
    <div className="relative w-full overflow-hidden mx-auto md:max-w-[1130px] flex flex-col items-center">
      {/* Carrousel */}
      <div ref={containerRef} className="w-full overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: getScrollPosition() }}
          transition={
            isResetting
              ? { duration: 0 } 
              : { type: 'spring', stiffness: 60, damping: 20 }
          }
          style={{ width: totalLooped * cardWidth }}
        >
          {loopedProjects.map((project, index) => {
            const style = getCardStyle(index);
            return (
              <motion.div
                key={`${project.id}-${index}`}
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
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
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
          onClick={() => setCurrentIndex((prev) => prev - 1)}
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
                num === currentIndex - cardsPerView ? 'bg-primary text-white' : 'bg-gray-100'
              } hover:bg-primary/80 hover:text-white`}
            >
              {num + 1}
            </button>
          ) : (
            <span key={i} className="px-2 text-gray-500">...</span>
          )
        )}

        <button
          onClick={() => setCurrentIndex((prev) => prev + 1)}
          disabled={currentIndex - cardsPerView === totalCards - 1}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}






