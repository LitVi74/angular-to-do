import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TuiCardLarge, TuiHeader } from '@taiga-ui/layout';
import { TuiButton, TuiSurface, TuiTitle } from '@taiga-ui/core';
import { TuiCheckbox } from '@taiga-ui/kit';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ITodo } from '../../../../reducers/todos/todos.reducer';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [
    TuiCardLarge,
    TuiTitle,
    TuiHeader,
    TuiSurface,
    TuiButton,
    TuiCheckbox,
    FormsModule,
    NgClass,
  ],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
})
export class TodoCardComponent implements OnChanges {
  @Input({ required: true }) todo!: ITodo;
  @Output() edit = new EventEmitter<ITodo>();
  @Output() delete = new EventEmitter<number>();
  @Output() done = new EventEmitter<{ id: number; done: boolean }>();

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  handleEditButtonClick() {
    this.edit.emit(this.todo);
  }

  handleDeleteButtonClick() {
    this.delete.emit(this.todo.id);
  }

  handleCheckedEdit(done: boolean) {
    this.done.emit({ id: this.todo.id, done });
  }
}
