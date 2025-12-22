import type { Resource } from '../../store/types';

interface ResourceLinkProps {
  resource: Resource;
}

const TYPE_ICONS: Record<Resource['type'], string> = {
  video: '[>]',
  article: '[=]',
  course: '[#]',
  podcast: '[~]',
  book: '[B]',
  tool: '[*]',
};

export function ResourceLink({ resource }: ResourceLinkProps) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
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
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent-1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-color)';
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
      <span style={{ flex: 1 }}>{resource.title}</span>
      <span
        style={{
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
        }}
      >
        -{'>'} go
      </span>
    </a>
  );
}
