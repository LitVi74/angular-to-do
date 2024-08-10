import { createFeature, createReducer, on } from '@ngrx/store';
import { todosPageActions } from './todos.actions';

const TODOS_FACTORY_KEY = 'todos';

export interface ITodo {
  id: number;
  title: string;
  checked: boolean;
}

export interface TodosState {
  todos: ITodo[];
}

const initialState: TodosState = {
  todos: [
    {
      id: 1,
      title: 'Todo 1',
      checked: false,
    },
  ],
};

export const todosFactory = createFeature({
  name: TODOS_FACTORY_KEY,
  reducer: createReducer(
    initialState,
    on(todosPageActions.addNewTodo, (state: TodosState, { title }) => ({
      ...state,
      todos: [...state.todos, { id: 2, title, checked: false }],
    })),
  ),
});
