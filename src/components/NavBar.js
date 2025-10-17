import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { selectAuthedUserId, selectUsers } from '../utils/selectors';
import UserAvatar from './UserAvatar';

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authedUserId = useSelector(selectAuthedUserId);
  const users = useSelector(selectUsers);
  const user = authedUserId ? users[authedUserId] : null;

  const onLogout = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
  };

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? '#007bff' : '#333',
    textDecoration: 'none',
    fontWeight: isActive ? 'bold' : 'normal',
    padding: '8px 12px',
    borderRadius: '4px',
    backgroundColor: isActive ? '#f0f8ff' : 'transparent'
  });

  return (
    <nav style={{ 
      display: 'flex', 
      gap: 16, 
      alignItems: 'center', 
      padding: '12px 24px', 
      borderBottom: '2px solid #eee',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ margin: 0, color: '#333', marginRight: 'auto' }}>Employee Polls</h2>
      
      {user && (
        <>
          <NavLink to="/" style={navLinkStyle}>Home</NavLink>
          <NavLink to="/leaderboard" style={navLinkStyle}>Leaderboard</NavLink>
          <NavLink to="/add" style={navLinkStyle}>New</NavLink>

          <div style={{ marginLeft: '24px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <UserAvatar src={user.avatarURL} alt={user.name} />
            <span style={{ fontWeight: 'bold' }}>Hello, {user.name}</span>
            <button 
              onClick={onLogout}
              style={{
                marginLeft: '12px',
                padding: '6px 12px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </>
      )}
    </nav>
  );
}