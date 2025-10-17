import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div style={{ 
      maxWidth: 520, 
      margin: '60px auto', 
      textAlign: 'center',
      padding: '40px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: 'white',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ color: '#dc3545', fontSize: '48px', margin: '0 0 16px 0' }}>404</h2>
      <h3 style={{ color: '#333', margin: '0 0 16px 0' }}>Page Not Found</h3>
      <p style={{ color: '#666', fontSize: '16px', marginBottom: '32px' }}>
        The page you requested does not exist or may have been moved.
      </p>
      <Link 
        to="/" 
        style={{
          display: 'inline-block',
          padding: '12px 24px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontWeight: 'bold'
        }}
      >
        Go Home
      </Link>
    </div>
  );
}