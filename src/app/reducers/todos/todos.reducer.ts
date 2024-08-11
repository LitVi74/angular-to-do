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
    on(todosPageActions.addNewTodo, (state: TodosState, { title }) => {
      const maxId = Math.max(...state.todos.map(({ id }) => id));

      return {
        ...state,
        todos: [...state.todos, { id: maxId + 1, title, checked: false }],
      };
    }),
    on(todosPageActions.editTodoTitle, (state: TodosState, { id, title }) => {
      const todos = state.todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          id,
          title,
          checked: todo.checked,
        } as ITodo;
      });

      return {
        ...state,
        todos,
      };
    }),
    on(todosPageActions.deleteTodo, (state, { id }) => {
      const todos = state.todos.filter((todo) => todo.id !== id);

      return {
        ...state,
        todos,
      };
    }),
  ),
});
