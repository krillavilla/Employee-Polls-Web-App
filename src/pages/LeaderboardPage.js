import { useSelector } from 'react-redux';
import { selectUsers } from '../utils/selectors';
import UserAvatar from '../components/UserAvatar';

export default function LeaderboardPage() {
  const users = useSelector(selectUsers);
  
  const leaderboardData = Object.values(users)
    .map((user) => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      answered: Object.keys(user.answers).length,
      created: user.questions.length,
      total: Object.keys(user.answers).length + user.questions.length
    }))
    .sort((a, b) => b.total - a.total);

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '16px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    overflow: 'hidden'
  };

  const headerStyle = {
    backgroundColor: '#f8f9fa',
    padding: '16px 12px',
    textAlign: 'left',
    borderBottom: '2px solid #dee2e6',
    fontWeight: 'bold',
    color: '#495057'
  };

  const cellStyle = {
    padding: '16px 12px',
    borderBottom: '1px solid #dee2e6',
    textAlign: 'center'
  };

  const userCellStyle = {
    ...cellStyle,
    textAlign: 'left'
  };

  return (
    <div style={{ maxWidth: 800, margin: '24px auto', padding: '0 16px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 32, color: '#333' }}>
        Leaderboard
      </h2>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={headerStyle}>User</th>
              <th style={headerStyle}>Answered</th>
              <th style={headerStyle}>Created</th>
              <th style={headerStyle}>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user, index) => (
              <tr key={user.id} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white' }}>
                <td style={userCellStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <UserAvatar src={user.avatarURL} alt={user.name} size={40} />
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
                        {user.name}
                      </div>
                      <div style={{ color: '#666', fontSize: '14px' }}>
                        #{index + 1}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={cellStyle}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#007bff' }}>
                    {user.answered}
                  </span>
                </td>
                <td style={cellStyle}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#28a745' }}>
                    {user.created}
                  </span>
                </td>
                <td style={cellStyle}>
                  <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#dc3545' }}>
                    {user.total}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {leaderboardData.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#666',
          fontSize: '18px'
        }}>
          <p>No users found.</p>
        </div>
      )}
    </div>
  );
}