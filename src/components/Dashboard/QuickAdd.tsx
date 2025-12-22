import { useState } from 'react';
import { useStore } from '../../store/useStore';
import type { SubjectId } from '../../store/types';

interface QuickAddProps {
  onClose: () => void;
}

export function QuickAdd({ onClose }: QuickAddProps) {
  const { subjects, addDailyGoal } = useStore();
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | null>(null);

  const subject = selectedSubject
    ? subjects.find((s) => s.id === selectedSubject)
    : null;
  const incompletTopics =
    subject?.topics.filter((t) => !t.completed) || [];

  const handleAddTopic = (topicId: string) => {
    if (selectedSubject) {
      addDailyGoal({
        subjectId: selectedSubject,
        topicId,
      });
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--bg-card)',
          border: '2px solid var(--accent-1)',
          padding: '1.5rem',
          maxWidth: '400px',
          width: '90%',
          maxHeight: '80vh',
          overflow: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <h3 style={{ color: 'var(--accent-1)' }}>add to today</h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
            }}
          >
            [x]
          </button>
        </div>

        {!selectedSubject ? (
          <>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                marginBottom: '1rem',
              }}
            >
              pick a subject:
            </p>
            {subjects.map((s) => {
              const incomplete = s.topics.filter((t) => !t.completed).length;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedSubject(s.id)}
                  disabled={incomplete === 0}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.75rem',
                    marginBottom: '0.5rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color:
                      incomplete === 0
                        ? 'var(--text-muted)'
                        : 'var(--text-primary)',
                    cursor: incomplete === 0 ? 'default' : 'pointer',
                    fontFamily: 'var(--font-body)',
                    textAlign: 'left',
                  }}
                >
                  <span>
                    {s.emoji} {s.title}
                  </span>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {incomplete} left
                  </span>
                </button>
              );
            })}
          </>
        ) : (
          <>
            <button
              onClick={() => setSelectedSubject(null)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-1)',
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                marginBottom: '1rem',
                padding: 0,
              }}
            >
              {'<'} back
            </button>

            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                marginBottom: '1rem',
              }}
            >
              pick a topic from {subject?.title}:
            </p>

            {incompletTopics.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>
                all topics completed!
              </p>
            ) : (
              incompletTopics.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleAddTopic(topic.id)}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '0.75rem',
                    marginBottom: '0.5rem',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-body)',
                    textAlign: 'left',
                  }}
                >
                  {topic.title}
                  {topic.resources.length > 0 && (
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        marginTop: '0.25rem',
                      }}
                    >
                      {topic.resources.length} resource
                      {topic.resources.length !== 1 ? 's' : ''}
                    </span>
                  )}
                </button>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}
