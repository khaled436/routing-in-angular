import {Component, computed, DestroyRef, inject, input, OnInit} from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import {TasksService} from "./tasks.service";
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  userId = input.required<string>();
  private readonly taskService = inject(TasksService);
  // order = input<'asc'|'desc'>();
  order?: 'asc'|'desc';
  userTasks = computed(()=>
    this.taskService.allTasks().filter((task) =>
      task.userId === this.userId()
    )
  );

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.activatedRoute.queryParams.subscribe(
      {
        next: (params) =>  (this.order = params['order']),
      }
    )
    this.destroyRef.onDestroy(()=>subscription.unsubscribe)
  }

}
