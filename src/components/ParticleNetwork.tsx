import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuration
    const particleCount = 50;
    const particles: Particle[] = [];
    const connectionDistance = 150;
    const particleSpeed = 0.5;

    // Fonction pour obtenir la couleur en fonction du thème
    const getThemeColors = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      
      if (isDarkMode) {
        // Synthwave theme colors
        return {
          particle: 'rgba(255, 0, 255, 0.6)', // Rose synthwave
          connection: 'rgba(186, 230, 213, 0.8)' // Augmentation de l'opacité à 0.8
        };
      } else {
        // Garden theme colors
        return {
          particle: 'rgba(255, 0, 255, 0.2)', // Rose garden
          connection: 'rgba(150, 150, 150, 0.6)' // Augmentation de l'opacité à 0.6
        };
      }
    };

    // Observer les changements de thème
    const observer = new MutationObserver(() => {
      const colors = getThemeColors();
      // Mettre à jour les couleurs des particules existantes
      ctx.fillStyle = colors.particle;
      ctx.strokeStyle = colors.connection;
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Ajuster la taille du canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Gestionnaire de mouvement de la souris
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Créer les particules
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * particleSpeed,
        vy: (Math.random() - 0.5) * particleSpeed,
        radius: 2
      });
    }

    // Fonction d'animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const colors = getThemeColors();

      // Mettre à jour et dessiner les particules
      particles.forEach(particle => {
        // Mettre à jour la position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Rebondir sur les bords
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Dessiner la particule
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = colors.particle;
        ctx.fill();

        // Dessiner les connexions
        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = colors.connection;
            ctx.stroke();
          }
        });

        // Interaction avec la souris
        const dx = particle.x - mouseRef.current.x;
        const dy = particle.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const angle = Math.atan2(dy, dx);
          const force = (connectionDistance - distance) / connectionDistance;
          
          particle.vx += Math.cos(angle) * force * 0.2;
          particle.vy += Math.sin(angle) * force * 0.2;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default ParticleNetwork; 