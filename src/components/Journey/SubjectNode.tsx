import type { Subject } from '../../store/types';

interface SubjectNodeProps {
  subject: Subject;
  position: { x: number; y: number };
  progress: number;
  onClick: () => void;
}

export function SubjectNode({
  subject,
  position,
  progress,
  onClick,
}: SubjectNodeProps) {
  const isComplete = progress === 100;

  return (
    <button
      className={`subject-node ${isComplete ? 'completed' : ''}`}
      onClick={onClick}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        borderColor: subject.color,
        background: isComplete
          ? subject.color
          : `linear-gradient(to top, ${subject.color}${Math.round(
              progress * 2.55
            )
              .toString(16)
              .padStart(2, '0')} ${progress}%, var(--bg-secondary) ${progress}%)`,
      }}
    >
      <span style={{ fontSize: '1.5rem' }}>{subject.emoji}</span>
      <span
        style={{
          fontSize: '0.85rem',
          marginTop: '0.25rem',
        }}
      >
        {subject.title}
      </span>
      <span
        style={{
          fontSize: '0.7rem',
          color: isComplete ? 'inherit' : 'var(--text-muted)',
          marginTop: '0.25rem',
        }}
      >
        {Math.round(progress)}%
      </span>
    </button>
  );
}
