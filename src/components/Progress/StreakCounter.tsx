interface StreakCounterProps {
  streak: number;
}

export function StreakCounter({ streak }: StreakCounterProps) {
  const getStreakEmoji = () => {
    if (streak >= 7) return '~***';
    if (streak >= 3) return '~**';
    if (streak >= 1) return '~*';
    return '~.';
  };

  const getStreakMessage = () => {
    if (streak >= 7) return 'on fire!';
    if (streak >= 3) return 'nice streak';
    if (streak >= 1) return 'good start';
    return 'start today';
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.4rem 0.75rem',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        fontFamily: 'var(--font-display)',
      }}
    >
      <span style={{ color: 'var(--accent-2)' }}>{getStreakEmoji()}</span>
      <span style={{ fontWeight: 'bold' }}>{streak}</span>
      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        day{streak !== 1 ? 's' : ''} {getStreakMessage()}
      </span>
    </div>
  );
}
