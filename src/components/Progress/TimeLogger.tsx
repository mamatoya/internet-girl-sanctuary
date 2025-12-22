import { useState } from 'react';
import { useStore } from '../../store/useStore';
import type { SubjectId } from '../../store/types';

export function TimeLogger() {
  const { subjects, addTimeLog } = useStore();
  const [subjectId, setSubjectId] = useState<SubjectId>('math');
  const [duration, setDuration] = useState(30);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTimeLog({
      subjectId,
      duration,
      date: new Date().toISOString(),
      notes: notes || undefined,
    });
    setNotes('');
    setDuration(30);
  };

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '2px solid var(--border-color)',
        padding: '1.5rem',
      }}
    >
      <h3 style={{ marginBottom: '1rem', color: 'var(--accent-1)' }}>
        [+] Log Study Time
      </h3>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '0.25rem',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
            }}
          >
            subject:
          </label>
          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value as SubjectId)}
          >
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.emoji} {s.title}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '0.25rem',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
            }}
          >
            duration (minutes):
          </label>
          <input
            type="number"
            min={1}
            max={480}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '0.25rem',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
            }}
          >
            notes (optional):
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="what did you learn?"
          />
        </div>

        <button type="submit" className="btn btn--primary">
          {'>'} Log Time
        </button>
      </form>
    </div>
  );
}
