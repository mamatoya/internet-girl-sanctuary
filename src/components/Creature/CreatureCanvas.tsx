import { useEffect, useRef } from 'react';
import type { CreatureStage, CreatureMood } from '../../store/types';
import { CREATURE_SPRITES } from './creatureSprites';

interface CreatureCanvasProps {
  stage: CreatureStage;
  mood: CreatureMood;
  size?: number;
}

export function CreatureCanvas({
  stage,
  mood,
  size = 80,
}: CreatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const sprite = CREATURE_SPRITES[stage];
    const pixelSize = Math.floor(size / sprite[0].length);

    // Get theme colors from CSS variables
    const computedStyle = getComputedStyle(document.documentElement);
    const colors = {
      0: 'transparent',
      1: computedStyle.getPropertyValue('--accent-1').trim() || '#00f0ff',
      2: computedStyle.getPropertyValue('--accent-2').trim() || '#ff00aa',
      3: computedStyle.getPropertyValue('--bg-primary').trim() || '#0a0a0f',
    };

    let bobOffset = 0;
    let animFrame: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Gentle bobbing animation
      bobOffset = Math.sin(frameRef.current * 0.05) * 2;
      frameRef.current++;

      // Draw sprite
      sprite.forEach((row, y) => {
        row.forEach((pixel, x) => {
          if (pixel !== 0) {
            ctx.fillStyle = colors[pixel as keyof typeof colors];
            ctx.fillRect(
              x * pixelSize,
              y * pixelSize + bobOffset,
              pixelSize,
              pixelSize
            );
          }
        });
      });

      // Draw mood-based eyes overlay for non-egg stages
      if (stage > 0) {
        const eyeY = stage === 1 ? 3 : stage === 2 ? 2 : stage === 3 ? 2 : 2;
        const eyeColor = colors[3];

        ctx.fillStyle = eyeColor;

        if (mood === 'happy') {
          // ^_^ eyes
          ctx.fillRect(3 * pixelSize, eyeY * pixelSize + bobOffset, pixelSize, pixelSize / 2);
          ctx.fillRect(5 * pixelSize, eyeY * pixelSize + bobOffset, pixelSize, pixelSize / 2);
        } else if (mood === 'sad') {
          // T_T eyes with tear lines
          ctx.fillRect(3 * pixelSize, (eyeY + 0.5) * pixelSize + bobOffset, pixelSize, pixelSize);
          ctx.fillRect(5 * pixelSize, (eyeY + 0.5) * pixelSize + bobOffset, pixelSize, pixelSize);
        } else if (mood === 'sleepy') {
          // -_- closed eyes
          ctx.fillRect(3 * pixelSize, (eyeY + 0.3) * pixelSize + bobOffset, pixelSize, pixelSize / 3);
          ctx.fillRect(5 * pixelSize, (eyeY + 0.3) * pixelSize + bobOffset, pixelSize, pixelSize / 3);
        }
        // content uses default sprite eyes
      }

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
    };
  }, [stage, mood, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="creature-canvas"
      style={{ display: 'block', margin: '0 auto' }}
    />
  );
}
