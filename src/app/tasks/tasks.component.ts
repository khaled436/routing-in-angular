import {Component, computed, inject, input} from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import {TasksService} from "./tasks.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  userId = input.required<string>();
  private readonly taskService = inject(TasksService);
  order = input<'asc'|'desc'>();

  userTasks = computed(()=>
    this.taskService.allTasks().filter((task) =>
      task.userId === this.userId()
    )
  );
}
