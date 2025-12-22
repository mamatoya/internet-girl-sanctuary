import type { Subject } from '../../store/types';
import { ASCIIBox } from '../UI/ASCIIBox';
import { ProgressBar } from '../UI/ProgressBar';
import { TopicChecklist } from './TopicChecklist';

interface SubjectCardProps {
  subject: Subject;
}

export function SubjectCard({ subject }: SubjectCardProps) {
  const completedCount = subject.topics.filter((t) => t.completed).length;
  const totalCount = subject.topics.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <ASCIIBox title={`${subject.emoji} ${subject.title}`}>
      <div style={{ marginBottom: '1rem' }}>
        <ProgressBar
          value={progress}
          label={`${completedCount} of ${totalCount} topics complete`}
        />
      </div>

      <div className="ascii-divider">~ topics ~</div>

      <TopicChecklist topics={subject.topics} subjectId={subject.id} />
    </ASCIIBox>
  );
}
