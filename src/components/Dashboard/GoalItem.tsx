import { useStore } from '../../store/useStore';
import type { DailyGoal } from '../../store/types';

interface GoalItemProps {
  goal: DailyGoal;
}

export function GoalItem({ goal }: GoalItemProps) {
  const { subjects, completeDailyGoal, removeDailyGoal, toggleTopicComplete } =
    useStore();

  const subject = subjects.find((s) => s.id === goal.subjectId);
  const topic = subject?.topics.find((t) => t.id === goal.topicId);
  const resource = goal.resourceId
    ? topic?.resources.find((r) => r.id === goal.resourceId)
    : null;

  if (!subject || !topic) return null;

  const handleComplete = () => {
    completeDailyGoal(goal.id);
    if (!topic.completed) {
      toggleTopicComplete(goal.subjectId, goal.topicId);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem',
        background: goal.completed ? 'var(--bg-hover)' : 'var(--bg-secondary)',
        marginBottom: '0.5rem',
        opacity: goal.completed ? 0.7 : 1,
        transition: 'all 0.2s',
      }}
    >
      <button
        onClick={handleComplete}
        disabled={goal.completed}
        style={{
          width: '24px',
          height: '24px',
          border: `2px solid ${goal.completed ? 'var(--accent-2)' : 'var(--accent-1)'}`,
          background: goal.completed ? 'var(--accent-2)' : 'transparent',
          color: goal.completed ? 'var(--bg-primary)' : 'var(--accent-1)',
          cursor: goal.completed ? 'default' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          fontSize: '1rem',
          flexShrink: 0,
        }}
      >
        {goal.completed ? 'x' : ''}
      </button>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            textDecoration: goal.completed ? 'line-through' : 'none',
          }}
        >
          {topic.title}
        </div>
        <div
          style={{
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>{subject.emoji}</span>
          <span>{subject.title}</span>
          {resource && (
            <>
              <span>{'>'}</span>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent-1)' }}
              >
                {resource.title}
              </a>
            </>
          )}
        </div>
      </div>

      {!goal.completed && (
        <button
          onClick={() => removeDailyGoal(goal.id)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-display)',
          }}
        >
          [x]
        </button>
      )}
    </div>
  );
}
