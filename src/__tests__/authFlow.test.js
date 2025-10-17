import { screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../components/App';
import { renderWithProviders } from './testUtils';

const mockUsers = {
  sarahedo: { 
    id: 'sarahedo', 
    name: 'Sarah Edo', 
    avatarURL: 'https://example.com/avatar.jpg',
    answers: {},
    questions: []
  }
};

const preloadedState = {
  auth: { userId: null },
  users: { byId: mockUsers, status: 'succeeded', error: null },
  questions: { byId: {}, status: 'succeeded', error: null }
};

test('login via dropdown and see navbar greeting', async () => {
  renderWithProviders(<App />, { route: '/login', preloadedState });

  // Find and interact with the user select dropdown
  const userSelect = screen.getByLabelText(/Select a user to impersonate/i);
  fireEvent.change(userSelect, { target: { value: 'sarahedo' } });

  // Click the login button
  const loginButton = screen.getByRole('button', { name: /login/i });
  fireEvent.click(loginButton);

  // Wait for navigation and check that we see the user greeting
  await waitFor(() => {
    expect(screen.getByText(/Hello, Sarah Edo/i)).toBeInTheDocument();
  });
});