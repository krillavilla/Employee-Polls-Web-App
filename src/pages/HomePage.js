import { useState } from 'react';
import { useSelector } from 'react-redux';
import Tabs from '../components/Tabs';
import PollCard from '../components/PollCard';
import { selectUsers, selectQuestions, selectAnsweredIdsSorted, selectUnansweredIdsSorted } from '../utils/selectors';

export default function HomePage() {
  const [active, setActive] = useState('unanswered');
  const users = useSelector(selectUsers);
  const questions = useSelector(selectQuestions);
  const unansweredIds = useSelector(selectUnansweredIdsSorted);
  const answeredIds = useSelector(selectAnsweredIdsSorted);
  const list = active === 'unanswered' ? unansweredIds : answeredIds;

  return (
    <div style={{ maxWidth: 800, margin: '24px auto', padding: '0 16px' }}>
      <Tabs active={active} onChange={setActive} />
      
      <div>
        {list.map((id) => {
          const q = questions[id];
          const author = users[q?.author];
          if (!q || !author) return null;
          return <PollCard key={id} question={q} author={author} />;
        })}
        
        {list.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#666',
            fontSize: '18px'
          }}>
            <p>No polls to show in the {active} category.</p>
          </div>
        )}
      </div>
    </div>
  );
}