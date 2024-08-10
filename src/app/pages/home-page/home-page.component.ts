import { Component, inject, OnInit } from '@angular/core';
import { TuiInputModule } from '@taiga-ui/legacy';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiButton } from '@taiga-ui/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { selectAllTodos } from '../../reducers/todos';
import { TodoCardComponent } from './components/todo-card/todo-card.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputModule,
    ReactiveFormsModule,
    TuiButton,
    AsyncPipe,
    TodoCardComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private readonly store = inject(Store);
  todos$ = this.store.select(selectAllTodos);
  testForm = new FormGroup({
    testValue: new FormControl(''),
  });
}
