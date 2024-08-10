import { createFeatureSelector, createSelector } from '@ngrx/store';
import { todosFactory, TodosState } from './todos.reducer';

export const selectTodoState = createFeatureSelector<TodosState>(todosFactory.name);

export const selectAllTodos = createSelector(selectTodoState, (state: TodosState) => state.todos);
