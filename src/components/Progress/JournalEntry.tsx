import { useState } from 'react';
import { useStore } from '../../store/useStore';
import type { SubjectId } from '../../store/types';

export function JournalEntry() {
  const { subjects, addJournalEntry } = useStore();
  const [subjectId, setSubjectId] = useState<SubjectId | 'general'>('general');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<'great' | 'okay' | 'struggling'>('okay');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    addJournalEntry({
      subjectId,
      content: content.trim(),
      date: new Date().toISOString(),
      mood,
    });
    setContent('');
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
        [~] Write a Reflection
      </h3>

      <form onSubmit={handleSubmit}>
        <div
          style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}
        >
          <div style={{ flex: 1 }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.25rem',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
              }}
            >
              about:
            </label>
            <select
              value={subjectId}
              onChange={(e) =>
                setSubjectId(e.target.value as SubjectId | 'general')
              }
            >
              <option value="general">~* General</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.emoji} {s.title}
                </option>
              ))}
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.25rem',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
              }}
            >
              how's it going?
            </label>
            <select
              value={mood}
              onChange={(e) =>
                setMood(e.target.value as 'great' | 'okay' | 'struggling')
              }
            >
              <option value="great">^_^ great!</option>
              <option value="okay">-_- okay</option>
              <option value="struggling">&gt;_&lt; struggling</option>
            </select>
          </div>
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
            your thoughts:
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="what's on your mind? what did you learn? what's confusing?"
            style={{ minHeight: '120px' }}
          />
        </div>

        <button
          type="submit"
          className="btn btn--primary"
          disabled={!content.trim()}
        >
          {'>'} Save Entry
        </button>
      </form>
    </div>
  );
}
