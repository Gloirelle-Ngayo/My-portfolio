'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUser, faCode, faEnvelope, faMoon, faSun, faLanguage } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function Header() {
  //variable qui permet de définir le thème avec useTheme
  const { theme, setTheme } = useTheme(); 
  //Variable qui permet de définir la section active lors du scroll
  const [activeSection, setActiveSection] = useState('accueil');
  //variable qui permet de gérer l'affichage du bouton burger 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /*hook qui permet de gérer les effets de scroll sur 
  le navigateur et detecter la section qui est active*/
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 200; // Augmenter l'offset pour une meilleure détection

      let currentSection = 'accueil';

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id');

        // Vérifier si la section est dans le viewport avec une marge
        const sectionBottom = sectionTop + sectionHeight;
        const isInView = scrollPosition >= sectionTop - 100 && scrollPosition < sectionBottom - 100;
        
        if (isInView) {
          currentSection = sectionId || 'accueil';
        }
        
        // Si on est au début de la page, sélectionner accueil
        if (scrollPosition < 300) {
          currentSection = 'accueil';
        }
      });

      setActiveSection(currentSection);
    };

    // Appeler handleScroll immédiatement pour définir la section initiale
    handleScroll();
    
    // Utiliser throttle pour améliorer les performances
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', throttledHandleScroll);
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, []);

  //variable qui permet de changer de thème, en définissant setTheme()
  const toggleTheme = () => {
    setTheme(theme === 'garden' ? 'synthwave' : 'garden');
  };

  //variable qui permet d'ouvrir le menu burger lorsqu'on clique
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Le retour du menu
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-base-100 backdrop-blur-sm">
      <nav className="border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-base-content">Gloirelle NGAYO</span>
          
          <div className={`${isMenuOpen ? 'block' : 'hidden'} absolute top-full left-0 right-0 w-full md:relative md:block md:w-auto bg-base-300/95 backdrop-blur-sm md:bg-transparent`} id="navbar-default">
            <ul className="font-medium flex flex-col md:flex-row md:space-x-2 rtl:space-x-reverse md:mt-0 md:border-0 p-4 md:p-0">
              <li className="border border-base-200 rounded-lg bg-base-100 hover:bg-base-200 transition-colors duration-300">
                <a href="#accueil" className={`block px-4 py-2 ${activeSection === 'accueil' ? 'text-primary bg-primary/10' : 'text-base-content'} rounded-lg transition-colors duration-300 flex items-center gap-2`}>
                  <FontAwesomeIcon icon={faHome} className="w-4 h-4" />
                  Accueil
                </a>
              </li>
              <li className="border border-base-200 rounded-lg bg-base-100 hover:bg-base-200 transition-colors duration-300">
                 <a href="#projets" className={`block px-4 py-2 ${activeSection === 'projets' ? 'text-primary bg-primary/10' : 'text-base-content'} rounded-lg transition-colors duration-300 flex items-center gap-2`}>
                    <FontAwesomeIcon icon={faCode} className="w-4 h-4" />
                    Projets
                  </a>
              </li>
              <li className="border border-base-200 rounded-lg bg-base-100 hover:bg-base-200 transition-colors duration-300">
                <a href="#formations" className={`block px-4 py-2 ${activeSection === 'formations' ? 'text-primary bg-primary/10' : 'text-base-content'} rounded-lg transition-colors duration-300 flex items-center gap-2`}>
                  <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                  Formations
                </a>
              </li>
              <li className="border border-base-200 rounded-lg bg-base-100 hover:bg-base-200 transition-colors duration-300">
                <a href="#contact" className={`block px-4 py-2 ${activeSection === 'contact' ? 'text-primary bg-primary/10' : 'text-base-content'} rounded-lg transition-colors duration-300 flex items-center gap-2`}>
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-base-200 transition-all duration-300 hover:rotate-180"
            >
              {theme === 'garden' ? (
                <FontAwesomeIcon icon={faMoon} className="w-5 h-5 text-base-content" />
              ) : (
                <FontAwesomeIcon icon={faSun} className="w-5 h-5 text-base-content" />
              )}
            </button>
            <button 
              className="p-2 rounded-lg hover:bg-base-200 transition-all duration-300 flex items-center gap-2 text-base-content"
            >
              <FontAwesomeIcon icon={faLanguage} className="w-5 h-5" />
              <span className="hidden md:inline">FR</span>
            </button>
          </div>
          
          <button 
            onClick={toggleMenu}
            data-collapse-toggle="navbar-default" 
            type="button" 
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-base-content rounded-lg md:hidden hover:bg-base-200 focus:outline-none focus:ring-2 focus:ring-base-200" 
            aria-controls="navbar-default" 
            aria-expanded={isMenuOpen}
          >
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}

