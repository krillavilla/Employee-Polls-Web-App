import { screen } from '@testing-library/react';
import App from '../components/App';
import { renderWithProviders } from './testUtils';

test('shows 404 for non-existent poll after login', () => {
  const preloadedState = {
    auth: { userId: 'u1' },
    users: { 
      byId: { 
        u1: { 
          id: 'u1', 
          name: 'User 1', 
          avatarURL: 'https://example.com/u1.jpg',
          answers: {},
          questions: []
        } 
      }, 
      status: 'succeeded', 
      error: null 
    },
    questions: { byId: {}, status: 'succeeded', error: null }
  };

  renderWithProviders(<App />, { 
    route: '/questions/does-not-exist', 
    preloadedState 
  });

  expect(screen.getByText(/404/i)).toBeInTheDocument();
  expect(screen.getByText(/not found/i)).toBeInTheDocument();
});