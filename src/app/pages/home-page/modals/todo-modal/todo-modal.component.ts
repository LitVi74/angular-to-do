import { Component, inject } from '@angular/core';
import { TuiInputModule } from '@taiga-ui/legacy';
import { TuiButton, TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-modal',
  standalone: true,
  imports: [TuiInputModule, TuiButton, FormsModule],
  templateUrl: './todo-modal.component.html',
  styleUrl: './todo-modal.component.scss',
})
export class TodoModalComponent {
  private readonly context = inject<TuiDialogContext<string, string>>(POLYMORPHEUS_CONTEXT);
  todoTitle = this.context.data;

  closeModalAndSave() {
    this.context.completeWith(this.todoTitle);
  }
}
