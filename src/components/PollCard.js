import { Link } from 'react-router-dom';
import UserAvatar from './UserAvatar';

export default function PollCard({ question, author }) {
  if (!question || !author) return null;
  
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: 16, 
      borderRadius: 8, 
      marginBottom: 12,
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <UserAvatar src={author.avatarURL} alt={author.name} />
        <strong>{author.name} asks:</strong>
      </div>
      <h4 style={{ margin: '8px 0', color: '#333' }}>Would you rather</h4>
      <p style={{ color: '#666', marginBottom: 16 }}>
        ... {question.optionOne.text} ... or ... {question.optionTwo.text} ...
      </p>
      <Link 
        to={`/questions/${question.id}`}
        style={{
          color: '#007bff',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
      >
        View Poll
      </Link>
    </div>
  );
}