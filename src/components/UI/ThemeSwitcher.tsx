import { useStore } from '../../store/useStore';
import type { ThemeName } from '../../store/types';

const THEMES: { id: ThemeName; label: string; preview: string }[] = [
  { id: 'cyber-dream', label: 'Cyber Dream', preview: '#00f0ff' },
  { id: 'pastel-cloud', label: 'Pastel Cloud', preview: '#b8a9e8' },
  { id: 'y2k-grunge', label: 'Y2K Grunge', preview: '#ff6b35' },
  { id: 'digital-sunset', label: 'Digital Sunset', preview: '#ff6b6b' },
  { id: 'matrix-mode', label: 'Matrix Mode', preview: '#00ff00' },
  { id: 'bubblegum-pop', label: 'Bubblegum Pop', preview: '#ff69b4' },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useStore();

  return (
    <div style={{ position: 'relative' }}>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as ThemeName)}
        style={{
          padding: '0.4rem 0.75rem',
          fontSize: '0.85rem',
          cursor: 'pointer',
          minWidth: '140px',
        }}
      >
        {THEMES.map((t) => (
          <option key={t.id} value={t.id}>
            {t.label}
          </option>
        ))}
      </select>
    </div>
  );
}
