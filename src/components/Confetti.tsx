import React, { useEffect, useState } from 'react';

interface ConfettiProps {
  show: boolean;
  onDone?: () => void;
}

const COLORS = [
  'hsl(40, 62%, 55%)',   // gold
  'hsl(152, 44%, 49%)',  // green
  'hsl(218, 46%, 20%)',  // navy
  'hsl(0, 84%, 60%)',    // red
  'hsl(200, 70%, 55%)',  // blue
];

const Confetti: React.FC<ConfettiProps> = ({ show, onDone }) => {
  const [pieces, setPieces] = useState<{ id: number; x: number; color: string; delay: number; size: number }[]>([]);

  useEffect(() => {
    if (show) {
      const newPieces = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 0.8,
        size: 6 + Math.random() * 8,
      }));
      setPieces(newPieces);
      const timer = setTimeout(() => {
        setPieces([]);
        onDone?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onDone]);

  if (!pieces.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {pieces.map(p => (
        <div
          key={p.id}
          className="absolute animate-confetti rounded-sm"
          style={{
            left: `${p.x}%`,
            top: '-20px',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
