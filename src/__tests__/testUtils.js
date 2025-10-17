// Test utilities for rendering components with Redux and React Router
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import authReducer from '../features/auth/authSlice';
import usersReducer from '../features/users/usersSlice';
import questionsReducer from '../features/questions/questionsSlice';

export function renderWithProviders(ui, { route = '/', preloadedState = {}, ...renderOptions } = {}) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      users: usersReducer,
      questions: questionsReducer
    },
    preloadedState
  });

  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          {children}
        </MemoryRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// This file is a utility and should not be treated as a test
