import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import {ActivatedRouteSnapshot, CanDeactivateFn, Router, RouterLink, RouterStateSnapshot} from "@angular/router";

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  private readonly tasksService = inject(TasksService);
  private readonly routerService = inject(Router);


  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
    this.routerService.navigate(['/users',this.userId(),'tasks'],{
      replaceUrl:true
    });
  }
}

export const canLeavePage: CanDeactivateFn<NewTaskComponent> = (component) => {
  if (component.enteredDate() || component.enteredSummary() || component.enteredTitle()){
    return window.confirm('do you want to leave this task?');
  }
  return true;
}
