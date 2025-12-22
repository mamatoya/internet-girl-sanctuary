import type { ReactNode } from 'react';

interface ASCIIBoxProps {
  children: ReactNode;
  title?: string;
  variant?: 'simple' | 'double' | 'rounded';
  className?: string;
}

export function ASCIIBox({
  children,
  title,
  variant = 'simple',
  className = '',
}: ASCIIBoxProps) {
  const corners = {
    simple: { tl: '+', tr: '+', bl: '+', br: '+', h: '-', v: '|' },
    double: { tl: '╔', tr: '╗', bl: '╚', br: '╝', h: '═', v: '║' },
    rounded: { tl: '╭', tr: '╮', bl: '╰', br: '╯', h: '─', v: '│' },
  }[variant];

  return (
    <div className={`card ${className}`}>
      {title && (
        <div
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--accent-1)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span style={{ color: 'var(--text-muted)' }}>
            {corners.tl}
            {corners.h}
            {corners.h}
          </span>
          <span>{title}</span>
          <span style={{ color: 'var(--text-muted)', flex: 1 }}>
            {corners.h.repeat(10)}
            {corners.tr}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}
