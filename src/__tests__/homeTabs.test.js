import { screen, fireEvent } from '@testing-library/react';
import HomePage from '../pages/HomePage';
import { renderWithProviders } from './testUtils';

const mockUsers = {
  u1: { 
    id: 'u1', 
    name: 'User One', 
    avatarURL: 'https://example.com/u1.jpg',
    answers: { q2: 'optionOne' },
    questions: []
  }
};

const mockQuestions = {
  q1: { 
    id: 'q1', 
    author: 'u1', 
    timestamp: 3,
    optionOne: { text: 'Option A', votes: [] },
    optionTwo: { text: 'Option B', votes: [] }
  },
  q2: { 
    id: 'q2', 
    author: 'u1', 
    timestamp: 2,
    optionOne: { text: 'Option C', votes: ['u1'] },
    optionTwo: { text: 'Option D', votes: [] }
  }
};

const preloadedState = {
  auth: { userId: 'u1' },
  users: { byId: mockUsers, status: 'succeeded', error: null },
  questions: { byId: mockQuestions, status: 'succeeded', error: null }
};

test('defaults to Unanswered and toggles to Answered', () => {
  renderWithProviders(<HomePage />, { preloadedState });

  // Should show unanswered question by default
  expect(screen.getByText(/would you rather/i)).toBeInTheDocument();
  expect(screen.getByText(/Option A/)).toBeInTheDocument();

  // Click on Answered tab
  const answeredTab = screen.getByRole('button', { name: 'Answered' });
  fireEvent.click(answeredTab);

  // Should now show answered question
  expect(screen.getByText(/Option C/)).toBeInTheDocument();
});