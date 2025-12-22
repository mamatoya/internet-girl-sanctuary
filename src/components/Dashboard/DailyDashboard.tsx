import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { GoalItem } from './GoalItem';
import { QuickAdd } from './QuickAdd';

export function DailyDashboard() {
  const {
    subjects,
    dailyGoals,
    suggestDailyGoals,
    addDailyGoal,
    startSession,
    progress,
  } = useStore();

  const [showAdd, setShowAdd] = useState(false);

  // Get today's goals or suggest some
  const today = new Date().toISOString().split('T')[0];
  const todaysGoals = dailyGoals.filter((g) => g.date === today);
  const suggestions = todaysGoals.length === 0 ? suggestDailyGoals() : [];

  // Check if all goals are complete
  const allComplete =
    todaysGoals.length > 0 && todaysGoals.every((g) => g.completed);
  const incompleteGoals = todaysGoals.filter((g) => !g.completed);

  // Start a focus session with incomplete goals
  const handleStartSession = (timerMinutes?: number) => {
    const queue = incompleteGoals.map((g) => ({
      subjectId: g.subjectId,
      topicId: g.topicId,
      resourceId: g.resourceId,
    }));
    if (queue.length > 0) {
      startSession(queue, timerMinutes);
    }
  };

  // Use suggestions as today's goals
  const handleUseSuggestions = () => {
    suggestions.forEach((s) => {
      addDailyGoal({
        topicId: s.topicId,
        subjectId: s.subjectId,
      });
    });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
          ~* today *~
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        {progress.streakDays > 0 && (
          <p
            style={{
              color: 'var(--accent-2)',
              fontSize: '0.85rem',
              marginTop: '0.25rem',
            }}
          >
            {progress.streakDays} day streak ~*
          </p>
        )}
      </div>

      {/* Goals or Empty State */}
      {todaysGoals.length === 0 ? (
        <div
          style={{
            background: 'var(--bg-card)',
            border: '2px solid var(--border-color)',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
            no goals set for today yet
          </p>

          {suggestions.length > 0 && (
            <>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  marginBottom: '1rem',
                }}
              >
                suggested based on your progress:
              </p>
              <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
                {suggestions.map((s) => {
                  const subject = subjects.find((sub) => sub.id === s.subjectId);
                  const topic = subject?.topics.find((t) => t.id === s.topicId);
                  return (
                    <div
                      key={s.id}
                      style={{
                        padding: '0.5rem',
                        background: 'var(--bg-secondary)',
                        marginBottom: '0.5rem',
                        fontSize: '0.9rem',
                      }}
                    >
                      {subject?.emoji} {topic?.title}
                    </div>
                  );
                })}
              </div>
              <button className="btn btn--primary" onClick={handleUseSuggestions}>
                use these goals
              </button>
            </>
          )}

          <button
            className="btn"
            onClick={() => setShowAdd(true)}
            style={{ marginLeft: suggestions.length > 0 ? '0.5rem' : 0 }}
          >
            + pick my own
          </button>
        </div>
      ) : (
        <>
          {/* Today's Goals */}
          <div
            style={{
              background: 'var(--bg-card)',
              border: '2px solid var(--border-color)',
              padding: '1.5rem',
              marginBottom: '1rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <h3 style={{ color: 'var(--accent-1)' }}>
                [ ] today's focus ({incompleteGoals.length} left)
              </h3>
              <button
                className="btn btn--small"
                onClick={() => setShowAdd(true)}
              >
                + add
              </button>
            </div>

            {todaysGoals.map((goal) => (
              <GoalItem key={goal.id} goal={goal} />
            ))}
          </div>

          {/* Start Session Button */}
          {!allComplete && incompleteGoals.length > 0 && (
            <div
              style={{
                background: 'var(--bg-secondary)',
                border: '2px solid var(--accent-1)',
                padding: '1.5rem',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  marginBottom: '1rem',
                  fontFamily: 'var(--font-display)',
                }}
              >
                ready to learn?
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                <button
                  className="btn btn--primary"
                  onClick={() => handleStartSession()}
                >
                  start session
                </button>
                <button
                  className="btn"
                  onClick={() => handleStartSession(25)}
                >
                  25 min focus
                </button>
                <button
                  className="btn"
                  onClick={() => handleStartSession(50)}
                >
                  50 min deep
                </button>
              </div>
            </div>
          )}

          {/* All Complete */}
          {allComplete && (
            <div
              style={{
                background: 'var(--bg-card)',
                border: '2px solid var(--accent-2)',
                padding: '2rem',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                ^_^
              </div>
              <p style={{ color: 'var(--accent-2)' }}>
                you did it! all goals complete for today.
              </p>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  marginTop: '0.5rem',
                }}
              >
                come back tomorrow or add more goals
              </p>
            </div>
          )}
        </>
      )}

      {/* Quick Add Modal */}
      {showAdd && <QuickAdd onClose={() => setShowAdd(false)} />}
    </div>
  );
}
