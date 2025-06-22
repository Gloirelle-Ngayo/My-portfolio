import { useEffect, useRef } from 'react';

const NUM_PARTICLES = 70;
const COLORS = [
  'rgba(255,255,255,0.7)',
  'rgba(120,180,255,0.5)',
  'rgba(255,180,220,0.4)'
];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

const ParticlesClassicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    // Particules classiques
    const particles = Array.from({ length: NUM_PARTICLES }, () => ({
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      r: randomBetween(2, 4),
      dx: randomBetween(-0.5, 0.5),
      dy: randomBetween(-0.5, 0.5),
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    }));

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        // Mouvement
        p.x += p.dx;
        p.y += p.dy;
        // Rebonds sur les bords
        if (p.x < p.r || p.x > width - p.r) p.dx *= -1;
        if (p.y < p.r || p.y > height - p.r) p.dy *= -1;
      }
      requestAnimationFrame(animate);
    }
    animate();
    return () => {
      window.removeEventListener('resize', handleResize);
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

export default ParticlesClassicBackground; 