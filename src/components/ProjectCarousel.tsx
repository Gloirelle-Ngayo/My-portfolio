import React, { useState, useEffect } from 'react';
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
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const totalCards = projects.length;

  // 🔁 Détection taille écran
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setCardsPerView(1);
      else if (width < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🧠 Réajuste l’index si resize
  useEffect(() => {
    if (currentIndex > totalCards - cardsPerView) {
      setCurrentIndex(Math.max(0, totalCards - cardsPerView));
    }
  }, [cardsPerView, totalCards, currentIndex]);

  // Navigation carte par carte
  const handleNext = () => {
    if (currentIndex < totalCards - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const slideWidth = 100 / totalCards;

  // 💡 Style dynamique par carte
  const getCardStyle = (index: number) => {
    const isVisible = index >= currentIndex && index < currentIndex + cardsPerView;
    const middleIndex = currentIndex + Math.floor(cardsPerView / 2);

    if (focusedIndex === index) {
      return { scale: 1, opacity: 1, zIndex: 2 };
    }

    if (!isVisible) {
      return { scale: 0.9, opacity: 0.5, zIndex: 0 };
    }

    if (index === middleIndex) {
      return { scale: 1, opacity: 1, zIndex: 1 };
    }

    return { scale: 0.9, opacity: 0.5, zIndex: 1 };
  };

  return (
    <div className="relative w-full max-w-[1000px] mx-auto">
      <div className="overflow-hidden w-full">
        <motion.div
          className="flex"
          animate={{ x: `-${currentIndex * slideWidth}%` }}
          transition={{ type: 'spring', stiffness: 60, damping: 15 }}
          style={{ width: `${(100 * totalCards) / cardsPerView}%` }}
        >
          {projects.map((project, index) => {
            const style = getCardStyle(index);
            const handleClick = () => {
              // Scroll si la carte est hors champ
              if (index < currentIndex || index >= currentIndex + cardsPerView) {
                setCurrentIndex(Math.min(index, totalCards - cardsPerView));
              }
              // Toggle zoom
              setFocusedIndex(focusedIndex === index ? null : index);
            };

            return (
              <motion.div
                key={project.id}
                className="px-2 box-border cursor-pointer"
                style={{
                  width: `${100 / cardsPerView}%`,
                  zIndex: style.zIndex,
                }}
                animate={style}
                transition={{ type: 'spring', stiffness: 60, damping: 20 }}
                onClick={handleClick}
              >
                <ProjectCard project={project} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Boutons de navigation */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`px-4 py-2 bg-gray-700 text-white rounded ${
            currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : ''
          }`}
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex >= totalCards - 1}
          className={`px-4 py-2 bg-gray-700 text-white rounded ${
            currentIndex >= totalCards - 1 ? 'opacity-30 cursor-not-allowed' : ''
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}




