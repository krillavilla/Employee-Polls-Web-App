import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { loginSucceeded } from '../features/auth/authSlice';
import { selectUsers } from '../utils/selectors';

export default function LoginPage() {
  const users = useSelector(selectUsers);
  const [userId, setUserId] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userId) return;
    dispatch(loginSucceeded(userId));
    navigate(from, { replace: true });
  };

  const containerStyle = {
    maxWidth: 420,
    margin: '60px auto',
    padding: '32px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center'
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  const selectStyle = {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#f8f9fa'
  };

  const buttonStyle = {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: userId ? '#007bff' : '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: userId ? 'pointer' : 'not-allowed'
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ margin: '0 0 8px 0', color: '#333' }}>Employee Polls</h1>
      <h2 style={{ margin: '0 0 24px 0', color: '#666', fontWeight: 'normal' }}>Log In</h2>
      
      <form onSubmit={handleSubmit} style={formStyle}>
        <label htmlFor="userSelect" style={{ textAlign: 'left', fontWeight: 'bold' }}>
          Select a user to impersonate:
        </label>
        <select 
          id="userSelect" 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)}
          style={selectStyle}
        >
          <option value="" disabled>Choose a user</option>
          {Object.values(users).map((u) => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
        <button 
          type="submit" 
          disabled={!userId}
          style={buttonStyle}
        >
          Login
        </button>
      </form>
    </div>
  );
}