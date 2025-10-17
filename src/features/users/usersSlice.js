import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _getUsers } from '../../api/_DATA';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const users = await _getUsers();
  return users;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: { byId: {}, status: 'idle', error: null },
  reducers: {
    userAnswered: (state, action) => {
      const { authedUser, qid, answer } = action.payload;
      if (!state.byId[authedUser]) return;
      state.byId[authedUser].answers[qid] = answer;
    },
    userAsked: (state, action) => {
      const { question } = action.payload;
      if (!state.byId[question.author]) return;
      state.byId[question.author].questions.push(question.id);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.byId = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { userAnswered, userAsked } = usersSlice.actions;
export default usersSlice.reducer;