import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createQuestion } from '../features/questions/questionsSlice';
import { selectAuthedUserId } from '../utils/selectors';

export default function NewPollPage() {
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const author = useSelector(selectAuthedUserId);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!optionOne.trim() || !optionTwo.trim()) return;
    
    await dispatch(createQuestion({ 
      optionOneText: optionOne.trim(), 
      optionTwoText: optionTwo.trim(), 
      author 
    }));
    
    navigate('/', { replace: true });
  };

  const containerStyle = {
    maxWidth: 600,
    margin: '24px auto',
    padding: '32px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    marginBottom: '16px',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    backgroundColor: (optionOne.trim() && optionTwo.trim()) ? '#28a745' : '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: (optionOne.trim() && optionTwo.trim()) ? 'pointer' : 'not-allowed'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#333' }}>
        Would You Rather
      </h2>
      
      <p style={{ textAlign: 'center', color: '#666', marginBottom: 32 }}>
        Create a new poll by entering two options below.
      </p>
      
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="optionOne" style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>
            Option One:
          </label>
          <input
            id="optionOne"
            type="text"
            placeholder="Enter the first option"
            value={optionOne}
            onChange={(e) => setOptionOne(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ textAlign: 'center', margin: '16px 0', fontSize: '18px', fontWeight: 'bold', color: '#666' }}>
          OR
        </div>

        <div>
          <label htmlFor="optionTwo" style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>
            Option Two:
          </label>
          <input
            id="optionTwo"
            type="text"
            placeholder="Enter the second option"
            value={optionTwo}
            onChange={(e) => setOptionTwo(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button 
          type="submit" 
          disabled={!optionOne.trim() || !optionTwo.trim()}
          style={buttonStyle}
        >
          Create Poll
        </button>
      </form>
    </div>
  );
}