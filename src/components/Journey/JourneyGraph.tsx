import { useStore } from '../../store/useStore';
import { SubjectNode } from './SubjectNode';

// Positions for subject nodes (as percentages)
const NODE_POSITIONS = {
  math: { x: 20, y: 25 },
  physics: { x: 75, y: 20 },
  philosophy: { x: 25, y: 70 },
  'music-theory': { x: 70, y: 75 },
};

export function JourneyGraph() {
  const { subjects, setActiveSubject, setActiveView } = useStore();

  const handleNodeClick = (subjectId: string) => {
    setActiveSubject(subjectId as 'math' | 'physics' | 'philosophy' | 'music-theory');
    setActiveView('browse');
  };

  return (
    <div className="journey-container" style={{ position: 'relative' }}>
      {/* Background decorations */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {/* Connection lines between subjects */}
        <line
          x1="20%"
          y1="25%"
          x2="75%"
          y2="20%"
          stroke="var(--border-color)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        <line
          x1="20%"
          y1="25%"
          x2="25%"
          y2="70%"
          stroke="var(--border-color)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        <line
          x1="75%"
          y1="20%"
          x2="70%"
          y2="75%"
          stroke="var(--border-color)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        <line
          x1="25%"
          y1="70%"
          x2="70%"
          y2="75%"
          stroke="var(--border-color)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />

        {/* Decorative elements */}
        <text x="48%" y="48%" fill="var(--text-muted)" fontSize="24" textAnchor="middle">
          ~*~
        </text>
        <text x="10%" y="50%" fill="var(--text-muted)" fontSize="12" textAnchor="middle">
          *
        </text>
        <text x="90%" y="50%" fill="var(--text-muted)" fontSize="12" textAnchor="middle">
          *
        </text>
        <text x="50%" y="10%" fill="var(--text-muted)" fontSize="12" textAnchor="middle">
          . . .
        </text>
        <text x="50%" y="95%" fill="var(--text-muted)" fontSize="12" textAnchor="middle">
          . . .
        </text>
      </svg>

      {/* Subject nodes */}
      {subjects.map((subject) => {
        const position = NODE_POSITIONS[subject.id];
        const completedCount = subject.topics.filter((t) => t.completed).length;
        const totalCount = subject.topics.length;
        const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

        return (
          <SubjectNode
            key={subject.id}
            subject={subject}
            position={position}
            progress={progress}
            onClick={() => handleNodeClick(subject.id)}
          />
        );
      })}

      {/* Center message */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            color: 'var(--accent-1)',
          }}
        >
          your journey
        </div>
        <div
          style={{
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            marginTop: '0.25rem',
          }}
        >
          click a planet to explore
        </div>
      </div>
    </div>
  );
}
