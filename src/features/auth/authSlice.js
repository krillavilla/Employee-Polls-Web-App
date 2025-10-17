import { createSlice } from '@reduxjs/toolkit';
import { loadAuthedUser, saveAuthedUser, clearAuthedUser } from '../../utils/storage';

const initialState = { userId: loadAuthedUser() };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSucceeded: (state, action) => {
      state.userId = action.payload;
      saveAuthedUser(action.payload);
    },
    logout: (state) => {
      state.userId = null;
      clearAuthedUser();
    }
  }
});

export const { loginSucceeded, logout } = authSlice.actions;
export default authSlice.reducer;