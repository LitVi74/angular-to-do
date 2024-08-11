import { Component, inject } from '@angular/core';
import { TuiInputModule, TuiSelectModule } from '@taiga-ui/legacy';
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

class Sorter {
  constructor(
    public readonly todoKey: keyof ITodo,
    public readonly isAscending: boolean,
    public readonly text: string,
  ) {}
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TuiInputModule, TuiButton, AsyncPipe, TodoCardComponent, FormsModule, TuiSelectModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private readonly dialogs = inject(TuiDialogService);
  private readonly store = inject(Store);
  sorters = [
    new Sorter('id', true, 'Сначала старые'),
    new Sorter('id', false, 'Сначала новые'),
    new Sorter('title', true, 'От А до Я'),
    new Sorter('title', false, 'От Я до А'),
    new Sorter('checked', false, 'Сначала готовые'),
    new Sorter('checked', true, 'Сначала неготовые'),
  ];
  sorterValue = new BehaviorSubject(this.sorters[0]);
  searchValue = new BehaviorSubject<string>('');
  todos$ = combineLatest<[ITodo[], string, Sorter]>([
    this.store.select(selectAllTodos),
    this.searchValue,
    this.sorterValue,
  ]).pipe(
    map(([todos, search, sorter]) => {
      const searchedTodos = this.searchTodo(todos, search);
      return this.sortTodo(searchedTodos, sorter);
    }),
  );

  searchTodo(todos: ITodo[], search: string) {
    if (!search.trim()) {
      return todos;
    }

    return todos.filter(({ title }) => title.toLowerCase().includes(search.trim().toLowerCase()));
  }

  sortTodo(todos: ITodo[], sorter: Sorter) {
    return [...todos].sort((a, b) => {
      if (a[sorter.todoKey] < b[sorter.todoKey]) {
        return sorter.isAscending ? -1 : 1;
      }
      if (a[sorter.todoKey] > b[sorter.todoKey]) {
        return sorter.isAscending ? 1 : -1;
      }

      return 0;
    });
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

  handleSorderUpdate(value: Sorter) {
    this.sorterValue.next(value);
  }
}
