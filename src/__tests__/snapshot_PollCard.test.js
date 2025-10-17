import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PollCard from '../components/PollCard';

it('PollCard matches snapshot', () => {
  const question = {
    id: 'q1',
    author: 'sarahedo',
    timestamp: 1467166872634,
    optionOne: { text: 'Build with JavaScript', votes: [] },
    optionTwo: { text: 'Build with TypeScript', votes: [] }
  };
  
  const author = { 
    id: 'sarahedo', 
    name: 'Sarah Edo', 
    avatarURL: 'https://example.com/avatar.jpg' 
  };

  const { container } = render(
    <MemoryRouter>
      <PollCard question={question} author={author} />
    </MemoryRouter>
  );
    
  expect(container.firstChild).toMatchSnapshot();
});
