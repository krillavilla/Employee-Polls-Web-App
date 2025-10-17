import { screen } from '@testing-library/react';
import LeaderboardPage from '../pages/LeaderboardPage';
import { renderWithProviders } from './testUtils';

const mockUsers = {
  userA: { 
    id: 'userA', 
    name: 'Alice', 
    avatarURL: 'https://example.com/alice.jpg',
    answers: { q1: 'optionOne' },
    questions: ['q2']
  }, // total: 2
  userB: { 
    id: 'userB', 
    name: 'Bob', 
    avatarURL: 'https://example.com/bob.jpg',
    answers: { q1: 'optionTwo', q2: 'optionOne' },
    questions: ['q3']
  }, // total: 3
  userC: { 
    id: 'userC', 
    name: 'Charlie', 
    avatarURL: 'https://example.com/charlie.jpg',
    answers: {},
    questions: ['q4']
  } // total: 1
};

const preloadedState = {
  auth: { userId: 'userA' },
  users: { byId: mockUsers, status: 'succeeded', error: null },
  questions: { byId: {}, status: 'succeeded', error: null }
};

test('orders users by total score descending', () => {
  renderWithProviders(<LeaderboardPage />, { preloadedState });

  const userNames = screen.getAllByText(/Alice|Bob|Charlie/);
  
  // Bob should be first (highest total score: 3)
  expect(userNames[0]).toHaveTextContent('Bob');
  // Alice should be second (total score: 2)
  expect(userNames[1]).toHaveTextContent('Alice');
  // Charlie should be third (total score: 1)
  expect(userNames[2]).toHaveTextContent('Charlie');
});