import {Routes} from "@angular/router";
import {NoTaskComponent} from "./app/tasks/no-task/no-task.component";
import {UserTasksComponent} from "./app/users/user-tasks/user-tasks.component";
import {TasksComponent} from "./app/tasks/tasks.component";
import {NewTaskComponent} from "./app/tasks/new-task/new-task.component";
import {NotFoundComponent} from "./app/not-found/not-found.component";

export const routes: Routes = [
  {
    path:'',
    component: NoTaskComponent,
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children:[
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'prefix',
      },
      {
        path: 'tasks',
        component: TasksComponent,
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
]
