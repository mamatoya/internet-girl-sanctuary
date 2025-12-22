import { useStore } from '../../store/useStore';
import { ThemeSwitcher } from '../UI/ThemeSwitcher';
import { StreakCounter } from '../Progress/StreakCounter';

export function Header() {
  const { progress } = useStore();

  return (
    <header className="app-header">
      <div className="flex items-center gap-2">
        <h1>
          <span className="sparkle">~</span>
          <span className="sparkle">*</span>
          {' INTERNET GIRL '}
          <span className="sparkle">*</span>
          <span className="sparkle">~</span>
        </h1>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          learning sanctuary
        </span>
      </div>

      <div className="flex items-center gap-2">
        <StreakCounter streak={progress.streakDays} />
        <ThemeSwitcher />
      </div>
    </header>
  );
}
