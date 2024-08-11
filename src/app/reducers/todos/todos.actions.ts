import { createActionGroup, props } from '@ngrx/store';

export const todosPageActions = createActionGroup({
  source: 'TODOS PAGE',
  events: {
    addNewTodo: props<{ title: string }>(),
    editTodoTitle: props<{ id: number; title: string }>(),
    editTodoChecked: props<{ id: number; checked: boolean }>(),
    deleteTodo: props<{ id: number }>(),
  },
});
