import { useState } from 'react';
import type { Resource, SubjectId } from '../../store/types';
import { useStore } from '../../store/useStore';

interface ResourceLinkProps {
  resource: Resource;
  subjectId: SubjectId;
  topicId: string;
}

const TYPE_ICONS: Record<Resource['type'], string> = {
  video: '[>]',
  article: '[=]',
  course: '[#]',
  podcast: '[~]',
  book: '[B]',
  tool: '[*]',
};

export function ResourceLink({ resource, subjectId, topicId }: ResourceLinkProps) {
  const { updateResource, deleteResource } = useStore();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(resource.title);
  const [url, setUrl] = useState(resource.url);

  const handleSave = () => {
    if (title.trim() && url.trim()) {
      updateResource(subjectId, topicId, resource.id, {
        title: title.trim(),
        url: url.trim(),
      });
      setEditing(false);
    }
  };

  const handleCancel = () => {
    setTitle(resource.title);
    setUrl(resource.url);
    setEditing(false);
  };

  const handleDelete = () => {
    if (confirm('delete this resource?')) {
      deleteResource(subjectId, topicId, resource.id);
    }
  };

  if (editing) {
    return (
      <div
        style={{
          padding: '0.75rem',
          background: 'var(--bg-hover)',
          border: '2px solid var(--accent-1)',
          marginBottom: '0.5rem',
        }}
      >
        <div style={{ marginBottom: '0.5rem' }}>
          <label
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              display: 'block',
              marginBottom: '0.25rem',
            }}
          >
            title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
          <label
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              display: 'block',
              marginBottom: '0.25rem',
            }}
          >
            url
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between' }}>
          <button
            onClick={handleDelete}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-2)',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
              fontSize: '0.8rem',
            }}
          >
            [delete]
          </button>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handleCancel}
              style={{
                background: 'none',
                border: '1px solid var(--border-color)',
                padding: '0.25rem 0.5rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                fontSize: '0.8rem',
              }}
            >
              cancel
            </button>
            <button
              onClick={handleSave}
              className="btn btn--primary"
              style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}
            >
              save
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem',
        background: 'var(--bg-hover)',
        border: '1px solid var(--border-color)',
        marginBottom: '0.5rem',
        transition: 'all 0.2s',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--accent-2)',
        }}
      >
        {TYPE_ICONS[resource.type]}
      </span>
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          flex: 1,
          color: 'inherit',
          textDecoration: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--accent-1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'inherit';
        }}
      >
        {resource.title}
        <span
          style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            marginLeft: '0.5rem',
          }}
        >
          -{'>'} go
        </span>
      </a>
      <button
        onClick={() => setEditing(true)}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          fontFamily: 'var(--font-display)',
          fontSize: '0.75rem',
          padding: '0.25rem',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--accent-1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--text-muted)';
        }}
      >
        [edit]
      </button>
    </div>
  );
}
