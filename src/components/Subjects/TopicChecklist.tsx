import type { Topic, SubjectId } from '../../store/types';
import { useStore } from '../../store/useStore';
import { ResourceLink } from './ResourceLink';

interface TopicChecklistProps {
  topics: Topic[];
  subjectId: SubjectId;
}

export function TopicChecklist({ topics, subjectId }: TopicChecklistProps) {
  const { toggleTopicComplete } = useStore();

  return (
    <div className="flex-col gap-2">
      {topics.map((topic) => (
        <div
          key={topic.id}
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            padding: '1rem',
          }}
        >
          <label
            className={`checkbox-item ${topic.completed ? 'completed' : ''}`}
            style={{ marginBottom: '0.5rem' }}
          >
            <input
              type="checkbox"
              checked={topic.completed}
              onChange={() => toggleTopicComplete(subjectId, topic.id)}
            />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
              }}
            >
              {topic.completed ? '[x]' : '[ ]'} {topic.title}
            </span>
          </label>

          {topic.resources.length > 0 && (
            <div style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
              <div
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  marginBottom: '0.5rem',
                }}
              >
                resources:
              </div>
              {topic.resources.map((resource) => (
                <ResourceLink key={resource.id} resource={resource} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
