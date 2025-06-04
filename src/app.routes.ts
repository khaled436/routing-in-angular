import {Routes} from "@angular/router";
import {NoTaskComponent} from "./app/tasks/no-task/no-task.component";
import {resolveUserName, UserTasksComponent} from "./app/users/user-tasks/user-tasks.component";
import {NotFoundComponent} from "./app/not-found/not-found.component";
import {userRoutes} from "./app/users/users.routes";

export const routes: Routes = [
  {
    path:'',
    component: NoTaskComponent,
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: userRoutes,
    data: {
     message : 'hello',
    },
    runGuardsAndResolvers: 'always',
    resolve:  {
      userName: resolveUserName,
    },
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
]
