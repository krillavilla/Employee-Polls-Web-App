import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../../api/_DATA';
import { userAnswered, userAsked } from '../users/usersSlice';

export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
  const questions = await _getQuestions();
  return questions;
});

export const createQuestion = createAsyncThunk(
  'questions/createQuestion',
  async ({ optionOneText, optionTwoText, author }, { dispatch }) => {
    const q = await _saveQuestion({ optionOneText, optionTwoText, author });
    dispatch(userAsked({ question: q }));
    return q;
  }
);

export const answerQuestion = createAsyncThunk(
  'questions/answerQuestion',
  async ({ authedUser, qid, answer }, { dispatch }) => {
    await _saveQuestionAnswer({ authedUser, qid, answer });
    dispatch(userAnswered({ authedUser, qid, answer }));
    return { authedUser, qid, answer };
  }
);

const questionsSlice = createSlice({
  name: 'questions',
  initialState: { byId: {}, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.byId = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        const q = action.payload;
        state.byId[q.id] = q;
      })
      .addCase(answerQuestion.fulfilled, (state, action) => {
        const { authedUser, qid, answer } = action.payload;
        const q = state.byId[qid];
        if (!q) return;
        if (!q[answer].votes.includes(authedUser)) {
          q[answer].votes.push(authedUser);
        }
      });
  }
});

export default questionsSlice.reducer;