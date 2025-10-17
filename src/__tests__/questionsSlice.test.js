import questionsReducer, { answerQuestion } from '../features/questions/questionsSlice';
import usersReducer, { userAnswered } from '../features/users/usersSlice';

test('reducers reflect answered question', () => {
  const qid = 'q1';
  const authedUser = 'u1';
  const answer = 'optionOne';
  
  const initialQuestionsState = {
    byId: {
      q1: {
        id: 'q1',
        author: 'u2',
        timestamp: 1,
        optionOne: { text: 'Option A', votes: [] },
        optionTwo: { text: 'Option B', votes: [] }
      }
    },
    status: 'succeeded',
    error: null
  };
  
  const initialUsersState = {
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
  };

  // Test questions reducer
  const questionsState = questionsReducer(
    initialQuestionsState,
    { type: answerQuestion.fulfilled.type, payload: { authedUser, qid, answer } }
  );

  // Test users reducer
  const usersState = usersReducer(
    initialUsersState,
    userAnswered({ authedUser, qid, answer })
  );

  expect(questionsState.byId[qid].optionOne.votes).toContain('u1');
  expect(usersState.byId['u1'].answers[qid]).toBe('optionOne');
});