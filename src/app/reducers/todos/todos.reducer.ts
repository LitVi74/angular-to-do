import { createFeature, createReducer } from '@ngrx/store';

const TODOS_FACTORY_KEY = 'todos';

export interface TodosState {
  id: number;
  title: string;
  checked: boolean;
}

export interface State {
  todos: TodosState[];
}

const initialState: State = {
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
  reducer: createReducer(initialState),
});
