import { createSelector } from "@reduxjs/toolkit";

// Lookup file for values in the Redux store
// atomic selectors
export const getTodos = state => state.todos.value;
export const getTodosLoading = state => !state.loading.value.completed;

// memoized complex selectors
export const getCompletedTodos = createSelector([getTodos], todos => todos.filter(t => t.isCompleted));
export const getIncompleteTodos = createSelector([getTodos], todos => todos.filter(t => !t.isCompleted));

