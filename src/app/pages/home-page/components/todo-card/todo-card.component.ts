import { Component, Input } from '@angular/core';
import { ITodo } from '../../../../reducers/todos/todos.reducer';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
})
export class TodoCardComponent {
  @Input({ required: true }) todo!: ITodo;
}
