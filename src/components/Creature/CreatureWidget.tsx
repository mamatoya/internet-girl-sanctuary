import { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { CreatureCanvas } from './CreatureCanvas';
import { getRandomMessage, STAGE_NAMES } from './creatureSprites';

export function CreatureWidget() {
  const { creatureStage, creatureMood, progress } = useStore();
  const [message, setMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    setMessage(getRandomMessage(creatureMood));
  }, [creatureMood]);

  const milestonesToNext = () => {
    const thresholds = [1, 3, 6, 10];
    const current = progress.totalMilestones;

    for (const threshold of thresholds) {
      if (current < threshold) {
        return threshold - current;
      }
    }
    return 0; // max stage
  };

  if (isMinimized) {
    return (
      <button
        className="creature-widget"
        onClick={() => setIsMinimized(false)}
        style={{
          cursor: 'pointer',
          minWidth: 'auto',
          padding: '0.75rem',
        }}
      >
        <span style={{ fontSize: '1.5rem' }}>~*</span>
      </button>
    );
  }

  return (
    <div className="creature-widget">
      <button
        onClick={() => setIsMinimized(true)}
        style={{
          position: 'absolute',
          top: '0.25rem',
          right: '0.5rem',
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          fontFamily: 'var(--font-display)',
          fontSize: '0.75rem',
        }}
      >
        [x]
      </button>

      <CreatureCanvas stage={creatureStage} mood={creatureMood} size={80} />

      <div
        style={{
          fontSize: '0.75rem',
          color: 'var(--accent-2)',
          marginTop: '0.5rem',
          fontFamily: 'var(--font-display)',
        }}
      >
        {STAGE_NAMES[creatureStage]}
        {creatureStage < 4 && (
          <span style={{ color: 'var(--text-muted)' }}>
            {' '}
            ({milestonesToNext()} to evolve)
          </span>
        )}
      </div>

      <p className="creature-message">"{message}"</p>
    </div>
  );
}
