import { createSelector } from '@reduxjs/toolkit';

// Constant empty arrays to ensure reference equality
const EMPTY_ARRAY = [];

// Base selectors
export const selectAuthedUserId = (state) => state.auth.userId;
export const selectUsers = (state) => state.users.byId;
export const selectQuestions = (state) => state.questions.byId;

export const selectQuestionById = (state, id) => selectQuestions(state)[id] || null;

// Memoized selectors
export const selectSortedQuestionIds = createSelector(
  [selectQuestions],
  (questions) => {
    const questionList = Object.values(questions || {});
    if (questionList.length === 0) return EMPTY_ARRAY;
    
    return questionList
      .sort((a, b) => b.timestamp - a.timestamp)
      .map((q) => q.id);
  }
);

export const selectAnsweredIds = createSelector(
  [selectAuthedUserId, selectUsers],
  (uid, users) => {
    if (!uid || !users || !users[uid]) return EMPTY_ARRAY;
    const answers = users[uid].answers;
    if (!answers || Object.keys(answers).length === 0) return EMPTY_ARRAY;
    return Object.keys(answers);
  }
);

export const selectUnansweredIdsSorted = createSelector(
  [selectSortedQuestionIds, selectAnsweredIds],
  (sortedIds, answeredIds) => {
    if (!Array.isArray(sortedIds) || sortedIds.length === 0) return EMPTY_ARRAY;
    if (!Array.isArray(answeredIds) || answeredIds.length === 0) return sortedIds;
    
    const answered = new Set(answeredIds);
    const unanswered = sortedIds.filter((id) => !answered.has(id));
    return unanswered.length === 0 ? EMPTY_ARRAY : unanswered;
  }
);

export const selectAnsweredIdsSorted = createSelector(
  [selectSortedQuestionIds, selectAnsweredIds],
  (sortedIds, answeredIds) => {
    if (!Array.isArray(answeredIds) || answeredIds.length === 0) return EMPTY_ARRAY;
    if (!Array.isArray(sortedIds) || sortedIds.length === 0) return EMPTY_ARRAY;
    
    const answered = new Set(answeredIds);
    const answeredSorted = sortedIds.filter((id) => answered.has(id));
    return answeredSorted.length === 0 ? EMPTY_ARRAY : answeredSorted;
  }
);
