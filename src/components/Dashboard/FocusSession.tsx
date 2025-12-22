import { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';

export function FocusSession() {
  const {
    session,
    subjects,
    completeCurrentItem,
    nextInSession,
    endSession,
    addJournalEntry,
  } = useStore();

  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [notes, setNotes] = useState('');

  // Get current item
  const current = session.queue[session.currentIndex];
  const subject = current
    ? subjects.find((s) => s.id === current.subjectId)
    : null;
  const topic = subject?.topics.find((t) => t.id === current?.topicId);
  const resource = current?.resourceId
    ? topic?.resources.find((r) => r.id === current.resourceId)
    : topic?.resources[0];

  // Timer logic
  useEffect(() => {
    if (!session.timerEndTime) {
      setTimeLeft(null);
      return;
    }

    const updateTimer = () => {
      const end = new Date(session.timerEndTime!).getTime();
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((end - now) / 1000));
      setTimeLeft(remaining);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [session.timerEndTime]);

  // Save notes to journal
  const saveNotes = () => {
    if (notes.trim() && current) {
      addJournalEntry({
        subjectId: current.subjectId,
        content: `[${topic?.title}]\n\n${notes.trim()}`,
        date: new Date().toISOString(),
      });
      setNotes('');
    }
  };

  // Handle completing current item
  const handleComplete = () => {
    saveNotes();
    completeCurrentItem();
  };

  // Handle skipping
  const handleSkip = () => {
    saveNotes();
    nextInSession();
  };

  // Handle ending session
  const handleEnd = () => {
    saveNotes();
    endSession();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((session.currentIndex + 1) / session.queue.length) * 100;

  if (!current || !topic) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>no items in session</p>
        <button className="btn" onClick={endSession}>
          back to today
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: '700px',
        margin: '0 auto',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top bar - progress & timer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          padding: '0.75rem',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
        }}
      >
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {session.currentIndex + 1} of {session.queue.length}
        </div>
        <div
          style={{
            flex: 1,
            margin: '0 1rem',
            height: '4px',
            background: 'var(--bg-hover)',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'var(--accent-1)',
              transition: 'width 0.3s',
            }}
          />
        </div>
        {timeLeft !== null && (
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              color: timeLeft < 60 ? 'var(--accent-2)' : 'var(--accent-1)',
            }}
          >
            {formatTime(timeLeft)}
          </div>
        )}
        <button
          onClick={handleEnd}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            marginLeft: '1rem',
            fontFamily: 'var(--font-display)',
          }}
        >
          [end]
        </button>
      </div>

      {/* Main content - current topic */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--bg-card)',
          border: '2px solid var(--accent-1)',
          padding: '2rem',
        }}
      >
        <div style={{ marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
          {subject?.emoji} {subject?.title}
        </div>

        <h2
          style={{
            fontSize: '1.75rem',
            marginBottom: '1.5rem',
            color: 'var(--accent-1)',
          }}
        >
          {topic.title}
        </h2>

        {/* Resource link */}
        {resource && (
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              background: 'var(--bg-secondary)',
              border: '2px solid var(--border-color)',
              marginBottom: '1.5rem',
              color: 'var(--text-primary)',
              textDecoration: 'none',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-display)' }}>
                {resource.title}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {resource.type}
              </div>
            </div>
            <span style={{ color: 'var(--accent-1)' }}>open {'>'}</span>
          </a>
        )}

        {/* Other resources */}
        {topic.resources.length > 1 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <div
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                marginBottom: '0.5rem',
              }}
            >
              more resources:
            </div>
            {topic.resources
              .filter((r) => r.id !== resource?.id)
              .map((r) => (
                <a
                  key={r.id}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    padding: '0.5rem',
                    fontSize: '0.9rem',
                    color: 'var(--accent-1)',
                    marginBottom: '0.25rem',
                  }}
                >
                  {r.title} {'->'}
                </a>
              ))}
          </div>
        )}

        {/* Notes - always visible, saves to journal */}
        <div style={{ marginTop: 'auto' }}>
          <div
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              marginBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>notes</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-2)' }}>
              (saves to journal)
            </span>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="what are you learning? any thoughts or questions?"
            style={{ minHeight: '100px', marginBottom: '0.5rem' }}
          />
        </div>
      </div>

      {/* Bottom actions */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          marginTop: '1rem',
          justifyContent: 'center',
        }}
      >
        <button
          className="btn"
          onClick={handleSkip}
          style={{ flex: 1, maxWidth: '200px' }}
        >
          skip {'>>'}
        </button>
        <button
          className="btn btn--primary"
          onClick={handleComplete}
          style={{ flex: 2, maxWidth: '300px' }}
        >
          done! next {'>'}
        </button>
      </div>

      {/* Hint */}
      <div
        style={{
          textAlign: 'center',
          marginTop: '1rem',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
        }}
      >
        notes auto-save when you move on
      </div>
    </div>
  );
}
