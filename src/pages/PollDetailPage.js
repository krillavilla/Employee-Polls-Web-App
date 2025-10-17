import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo, useState } from 'react';
import { answerQuestion } from '../features/questions/questionsSlice';
import { selectAuthedUserId, selectQuestionById, selectUsers } from '../utils/selectors';
import NotFoundPage from './NotFoundPage';
import UserAvatar from '../components/UserAvatar';

export default function PollDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const authedUser = useSelector(selectAuthedUserId);
  const users = useSelector(selectUsers);
  const question = useSelector((state) => selectQuestionById(state, id));
  
  if (!question) return <NotFoundPage />;

  const author = users[question.author];
  const userAnswer = users[authedUser]?.answers[id];
  const [choice, setChoice] = useState(userAnswer || '');

  const totals = useMemo(() => {
    const a = question.optionOne.votes.length;
    const b = question.optionTwo.votes.length;
    const total = a + b || 1;
    return {
      a, b, total,
      aPct: Math.round((a / total) * 100),
      bPct: Math.round((b / total) * 100)
    };
  }, [question]);

  const onVote = (e) => {
    e.preventDefault();
    if (!choice) return;
    if (userAnswer) return;
    dispatch(answerQuestion({ authedUser, qid: id, answer: choice }));
  };

  const containerStyle = {
    maxWidth: 700,
    margin: '24px auto',
    padding: '24px',
    border: '1px solid #eee',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  };

  const optionStyle = (isUserChoice) => ({
    border: '2px solid #ddd',
    padding: '16px',
    marginBottom: '12px',
    borderRadius: '8px',
    backgroundColor: isUserChoice ? '#e6ffed' : '#fff',
    borderColor: isUserChoice ? '#28a745' : '#ddd'
  });

  const radioStyle = {
    marginRight: '8px',
    transform: 'scale(1.2)'
  };

  if (userAnswer) {
    return (
      <div style={containerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <UserAvatar src={author.avatarURL} alt={author.name} size={40} />
          <strong style={{ fontSize: '18px' }}>{author.name} asks:</strong>
        </div>
        
        <h3 style={{ textAlign: 'center', marginBottom: 24, color: '#333' }}>Would You Rather</h3>
        
        <div style={optionStyle(userAnswer === 'optionOne')}>
          <p style={{ fontSize: '16px', marginBottom: 8 }}>{question.optionOne.text}</p>
          <p style={{ color: '#666', marginBottom: 0 }}>
            <strong>{totals.a}</strong> out of <strong>{totals.total}</strong> votes ({totals.aPct}%)
            {userAnswer === 'optionOne' && <strong style={{ color: '#28a745', marginLeft: 8 }}>← Your Vote</strong>}
          </p>
        </div>
        
        <div style={optionStyle(userAnswer === 'optionTwo')}>
          <p style={{ fontSize: '16px', marginBottom: 8 }}>{question.optionTwo.text}</p>
          <p style={{ color: '#666', marginBottom: 0 }}>
            <strong>{totals.b}</strong> out of <strong>{totals.total}</strong> votes ({totals.bPct}%)
            {userAnswer === 'optionTwo' && <strong style={{ color: '#28a745', marginLeft: 8 }}>← Your Vote</strong>}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <UserAvatar src={author.avatarURL} alt={author.name} size={40} />
        <strong style={{ fontSize: '18px' }}>{author.name} asks:</strong>
      </div>
      
      <h3 style={{ textAlign: 'center', marginBottom: 24, color: '#333' }}>Would You Rather</h3>
      
      <form onSubmit={onVote}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'flex', alignItems: 'center', padding: '16px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', marginBottom: '12px' }}>
            <input
              type="radio"
              name="answer"
              value="optionOne"
              checked={choice === 'optionOne'}
              onChange={(e) => setChoice(e.target.value)}
              style={radioStyle}
            />
            <span style={{ fontSize: '16px' }}>{question.optionOne.text}</span>
          </label>
          
          <label style={{ display: 'flex', alignItems: 'center', padding: '16px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name="answer"
              value="optionTwo"
              checked={choice === 'optionTwo'}
              onChange={(e) => setChoice(e.target.value)}
              style={radioStyle}
            />
            <span style={{ fontSize: '16px' }}>{question.optionTwo.text}</span>
          </label>
        </div>
        
        <button 
          type="submit" 
          disabled={!choice}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            backgroundColor: choice ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: choice ? 'pointer' : 'not-allowed'
          }}
        >
          Submit Vote
        </button>
      </form>
    </div>
  );
}