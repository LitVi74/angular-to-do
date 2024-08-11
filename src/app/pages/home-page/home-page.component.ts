import { Component, inject } from '@angular/core';
import { TuiInputModule } from '@taiga-ui/legacy';
import { FormsModule } from '@angular/forms';
import { TuiButton, TuiDialogService } from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { selectAllTodos, todosPageActions } from '../../reducers/todos';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { TodoModalComponent } from './modals/todo-modal/todo-modal.component';
import { ITodo } from '../../reducers/todos/todos.reducer';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TuiInputModule, TuiButton, AsyncPipe, TodoCardComponent, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private readonly dialogs = inject(TuiDialogService);
  private readonly store = inject(Store);
  searchValue = new BehaviorSubject<string>('');
  todos$ = combineLatest<[ITodo[], string]>([
    this.store.select(selectAllTodos),
    this.searchValue,
  ]).pipe(map(([todos, search]) => this.searchTodo(todos, search)));

  searchTodo(todos: ITodo[], search: string) {
    if (!search.trim()) {
      return todos;
    }

    return todos.filter(({ title }) => title.toLowerCase().includes(search.trim().toLowerCase()));
  }

  openTodoModal(todo?: ITodo) {
    this.dialogs
      .open<string>(new PolymorpheusComponent(TodoModalComponent), {
        label: todo ? 'Редактирование задачи' : 'Создание задачи',
        data: todo?.title ?? '',
      })
      .subscribe((title) => {
        const titleNeat = title.trim();
        if (titleNeat) {
          if (todo) {
            this.store.dispatch(todosPageActions.editTodoTitle({ id: todo.id, title: titleNeat }));
          } else {
            this.store.dispatch(todosPageActions.addNewTodo({ title: titleNeat }));
          }
        }
      });
  }

  handleDeleteTodo(todoId: number) {
    this.store.dispatch(todosPageActions.deleteTodo({ id: todoId }));
  }

  handleTodoDone(todoId: number, done: boolean) {
    this.store.dispatch(todosPageActions.editTodoChecked({ id: todoId, checked: done }));
  }

  handleSearchUpdate(value: string) {
    this.searchValue.next(value);
  }
}