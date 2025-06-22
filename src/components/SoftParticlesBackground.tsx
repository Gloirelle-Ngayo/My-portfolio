import { useEffect, useRef } from 'react';

const NUM_PARTICLES = 60;
const COLORS = [
  'rgba(255,255,255,0.5)',
  'rgba(180,200,255,0.3)',
  'rgba(255,220,200,0.2)'
];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

const SoftParticlesBackground = () => {
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

    // Particules lumineuses
    const particles = Array.from({ length: NUM_PARTICLES }, () => ({
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      r: randomBetween(30, 70),
      dx: randomBetween(-0.2, 0.2),
      dy: randomBetween(-0.15, 0.15),
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    }));

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        // Mouvement
        p.x += p.dx;
        p.y += p.dy;
        // Rebond sur les bords
        if (p.x < -p.r) p.x = width + p.r;
        if (p.x > width + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = height + p.r;
        if (p.y > height + p.r) p.y = -p.r;
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

export default SoftParticlesBackground; 