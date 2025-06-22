import { useEffect, useRef } from 'react';

const NUM_POINTS = 40;
const COLORS = [
  'rgba(255,255,255,0.5)',
  'rgba(180,200,255,0.3)',
  'rgba(255,220,200,0.2)'
];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

const PointsBackground = () => {
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

    // Points bokeh
    const points = Array.from({ length: NUM_POINTS }, () => ({
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      r: randomBetween(8, 24),
      dx: randomBetween(-0.1, 0.1),
      dy: randomBetween(-0.1, 0.1),
      opacity: randomBetween(0.2, 0.7),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      life: randomBetween(120, 300),
      age: 0
    }));

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const p of points) {
        ctx.save();
        ctx.globalAlpha = p.opacity * Math.max(0, 1 - p.age / p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
        // Mouvement
        p.x += p.dx;
        p.y += p.dy;
        p.age++;
        // Réinitialiser le point quand il a "vécu" sa vie
        if (p.age > p.life) {
          p.x = randomBetween(0, width);
          p.y = randomBetween(0, height);
          p.r = randomBetween(8, 24);
          p.dx = randomBetween(-0.1, 0.1);
          p.dy = randomBetween(-0.1, 0.1);
          p.opacity = randomBetween(0.2, 0.7);
          p.color = COLORS[Math.floor(Math.random() * COLORS.length)];
          p.life = randomBetween(120, 300);
          p.age = 0;
        }
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

export default PointsBackground; 