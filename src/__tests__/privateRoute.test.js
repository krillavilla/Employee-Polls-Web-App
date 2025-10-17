import { screen } from '@testing-library/react';
import App from '../components/App';
import { renderWithProviders } from './testUtils';

test('redirects to login when not authenticated', () => {
  const preloadedState = {
    auth: { userId: null },
    users: { byId: {}, status: 'succeeded', error: null },
    questions: { byId: {}, status: 'succeeded', error: null }
  };

  renderWithProviders(<App />, { 
    route: '/leaderboard', 
    preloadedState 
  });

  expect(screen.getByText(/Log In/i)).toBeInTheDocument();
});