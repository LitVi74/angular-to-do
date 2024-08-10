import { createActionGroup, props } from '@ngrx/store';

export const todosPageActions = createActionGroup({
  source: 'TODOS PAGE',
  events: {
    addNewTodo: props<{ title: string }>(),
  },
});
