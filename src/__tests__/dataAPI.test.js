import { _saveQuestion, _saveQuestionAnswer } from '../api/_DATA';

describe('_saveQuestion', () => {
  it('returns saved question with expected fields when data is correctly formatted', async () => {
    const questionData = {
      optionOneText: 'Option A',
      optionTwoText: 'Option B',
      author: 'sarahedo'
    };

    const savedQuestion = await _saveQuestion(questionData);

    expect(savedQuestion).toHaveProperty('id');
    expect(savedQuestion).toHaveProperty('timestamp');
    expect(savedQuestion).toHaveProperty('author', 'sarahedo');
    expect(savedQuestion).toHaveProperty('optionOne');
    expect(savedQuestion).toHaveProperty('optionTwo');
    expect(savedQuestion.optionOne).toHaveProperty('text', 'Option A');
    expect(savedQuestion.optionOne).toHaveProperty('votes', []);
    expect(savedQuestion.optionTwo).toHaveProperty('text', 'Option B');
    expect(savedQuestion.optionTwo).toHaveProperty('votes', []);
  });

  it('rejects with an error when data is incorrect', async () => {
    const incompleteData = {
      optionOneText: 'Option A'
      // Missing optionTwoText and author
    };

    await expect(_saveQuestion(incompleteData))
      .rejects
      .toEqual('Please provide optionOneText, optionTwoText, and author');
  });
});

describe('_saveQuestionAnswer', () => {
  it('returns true when correctly formatted data is passed', async () => {
    const answerData = {
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionTwo'
    };

    const result = await _saveQuestionAnswer(answerData);
    expect(result).toBe(true);
  });

  it('rejects with an error when incorrect data is passed', async () => {
    const incompleteData = {
      authedUser: 'sarahedo'
      // Missing qid and answer
    };

    await expect(_saveQuestionAnswer(incompleteData))
      .rejects
      .toEqual('Please provide authedUser, qid, and answer');
  });
});