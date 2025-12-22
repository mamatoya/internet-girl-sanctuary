import { useStore } from '../../store/useStore';

const MOOD_ICONS = {
  great: '^_^',
  okay: '-_-',
  struggling: '>_<',
};

export function JournalList() {
  const { progress, subjects } = useStore();
  const entries = [...progress.journalEntries].reverse();

  const getSubjectName = (id: string) => {
    if (id === 'general') return 'General';
    const subject = subjects.find((s) => s.id === id);
    return subject ? subject.title : id;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (entries.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '2rem',
          color: 'var(--text-muted)',
        }}
      >
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>~*~</div>
        <div>no entries yet. start writing!</div>
      </div>
    );
  }

  return (
    <div className="flex-col gap-2">
      {entries.map((entry) => (
        <div
          key={entry.id}
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            padding: '1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem',
              fontSize: '0.85rem',
            }}
          >
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <span className="tag">{getSubjectName(entry.subjectId)}</span>
              {entry.mood && (
                <span style={{ color: 'var(--accent-2)' }}>
                  {MOOD_ICONS[entry.mood]}
                </span>
              )}
            </div>
            <span style={{ color: 'var(--text-muted)' }}>
              {formatDate(entry.date)}
            </span>
          </div>
          <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
            {entry.content}
          </p>
        </div>
      ))}
    </div>
  );
}
