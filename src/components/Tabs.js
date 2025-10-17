export default function Tabs({ active, onChange }) {
  const tabStyle = (isActive) => ({
    padding: '8px 16px',
    border: '1px solid #ddd',
    backgroundColor: isActive ? '#007bff' : '#f8f9fa',
    color: isActive ? 'white' : '#333',
    cursor: 'pointer',
    borderRadius: '4px',
    marginRight: '4px'
  });

  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
      <button 
        style={tabStyle(active === 'unanswered')} 
        aria-pressed={active === 'unanswered'} 
        onClick={() => onChange('unanswered')}
      >
        Unanswered
      </button>
      <button 
        style={tabStyle(active === 'answered')} 
        aria-pressed={active === 'answered'} 
        onClick={() => onChange('answered')}
      >
        Answered
      </button>
    </div>
  );
}