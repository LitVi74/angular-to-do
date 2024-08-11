import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { TuiButton, TuiSurface, TuiTitle } from '@taiga-ui/core';
import { TuiCheckbox } from '@taiga-ui/kit';
import { FormsModule } from '@angular/forms';
import { ITodo } from '../../../../reducers/todos/todos.reducer';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [TuiCardLarge, TuiTitle, TuiHeader, TuiSurface, TuiButton, TuiCheckbox, FormsModule],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
})
export class TodoCardComponent {
  @Input({ required: true }) todo!: ITodo;
  @Output() edit = new EventEmitter<ITodo>();
  @Output() delete = new EventEmitter<number>();

  handleEditButtonClick() {
    this.edit.emit(this.todo);
  }

  handleDeleteButtonClick() {
    this.delete.emit(this.todo.id);
  }
}
