import { useStore } from '../../store/useStore';
import { CreatureCanvas } from '../Creature/CreatureCanvas';
import { getRandomMessage, STAGE_NAMES } from '../Creature/creatureSprites';

export function Sidebar() {
  const {
    sidebarExpanded,
    toggleSidebar,
    activeView,
    setActiveView,
    creatureStage,
    creatureMood,
    progress,
    theme,
    setTheme,
  } = useStore();

  const themes = [
    'cyber-dream',
    'pastel-cloud',
    'y2k-grunge',
    'digital-sunset',
    'matrix-mode',
    'bubblegum-pop',
  ] as const;

  // Minimal collapsed state
  if (!sidebarExpanded) {
    return (
      <aside
        style={{
          position: 'fixed',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 50,
        }}
      >
        <button
          onClick={toggleSidebar}
          style={{
            background: 'var(--bg-card)',
            border: '2px solid var(--border-color)',
            borderLeft: 'none',
            padding: '1rem 0.5rem',
            cursor: 'pointer',
            color: 'var(--accent-1)',
            fontFamily: 'var(--font-display)',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
          }}
        >
          {'>'} menu
        </button>
      </aside>
    );
  }

  return (
    <aside
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: '240px',
        background: 'var(--bg-secondary)',
        borderRight: '2px solid var(--border-color)',
        padding: '1rem',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
      }}
    >
      {/* Close button */}
      <button
        onClick={toggleSidebar}
        style={{
          alignSelf: 'flex-end',
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          fontFamily: 'var(--font-display)',
          marginBottom: '1rem',
        }}
      >
        [x] close
      </button>

      {/* Creature */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          padding: '1rem',
          marginBottom: '1rem',
          textAlign: 'center',
        }}
      >
        <CreatureCanvas stage={creatureStage} mood={creatureMood} size={60} />
        <div
          style={{
            fontSize: '0.75rem',
            color: 'var(--accent-2)',
            marginTop: '0.5rem',
          }}
        >
          {STAGE_NAMES[creatureStage]}
        </div>
        <div
          style={{
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            fontStyle: 'italic',
            marginTop: '0.25rem',
          }}
        >
          "{getRandomMessage(creatureMood)}"
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          fontSize: '0.85rem',
          marginBottom: '1rem',
          padding: '0.75rem',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.25rem',
          }}
        >
          <span style={{ color: 'var(--text-muted)' }}>streak</span>
          <span>{progress.streakDays} days</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)' }}>topics done</span>
          <span>{progress.totalMilestones}</span>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ marginBottom: '1rem' }}>
        <div
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            marginBottom: '0.5rem',
          }}
        >
          . : nav : .
        </div>

        {[
          { id: 'today', label: 'Today', icon: '~*' },
          { id: 'browse', label: 'Browse All', icon: '~@' },
          { id: 'journal', label: 'Journal', icon: '~?' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveView(item.id as 'today' | 'browse' | 'journal');
              toggleSidebar();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              width: '100%',
              padding: '0.5rem',
              marginBottom: '0.25rem',
              background:
                activeView === item.id
                  ? 'var(--bg-card)'
                  : 'transparent',
              border:
                activeView === item.id
                  ? '1px solid var(--accent-1)'
                  : '1px solid transparent',
              color:
                activeView === item.id
                  ? 'var(--accent-1)'
                  : 'var(--text-secondary)',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              textAlign: 'left',
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Theme */}
      <div style={{ marginTop: 'auto' }}>
        <div
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            marginBottom: '0.5rem',
          }}
        >
          . : theme : .
        </div>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as typeof theme)}
          style={{ width: '100%', fontSize: '0.85rem' }}
        >
          {themes.map((t) => (
            <option key={t} value={t}>
              {t.replace('-', ' ')}
            </option>
          ))}
        </select>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: '1rem',
          textAlign: 'center',
          fontSize: '0.7rem',
          color: 'var(--text-muted)',
        }}
      >
        ~* internet girl *~
      </div>
    </aside>
  );
}
