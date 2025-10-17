import { screen, fireEvent } from '@testing-library/react';
import NewPollPage from '../pages/NewPollPage';
import { renderWithProviders } from './testUtils';

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

test('submit is disabled until both inputs are filled', () => {
  renderWithProviders(<NewPollPage />, { preloadedState });

  const submitButton = screen.getByRole('button', { name: /Create Poll/i });
  const optionOneInput = screen.getByLabelText(/Option One/i);
  const optionTwoInput = screen.getByLabelText(/Option Two/i);

  // Button should be disabled initially
  expect(submitButton).toBeDisabled();

  // Fill first option only
  fireEvent.change(optionOneInput, { target: { value: 'First option' } });
  expect(submitButton).toBeDisabled();

  // Fill second option
  fireEvent.change(optionTwoInput, { target: { value: 'Second option' } });
  expect(submitButton).not.toBeDisabled();

  // Clear first option
  fireEvent.change(optionOneInput, { target: { value: '' } });
  expect(submitButton).toBeDisabled();
});