import {CanMatchFn, RedirectCommand, Router, Routes} from "@angular/router";
import {NoTaskComponent} from "./app/tasks/no-task/no-task.component";
import {resolveUserName, resolveTitle, UserTasksComponent} from "./app/users/user-tasks/user-tasks.component";
import {NotFoundComponent} from "./app/not-found/not-found.component";
import {userRoutes} from "./app/users/users.routes";
import {inject} from "@angular/core";

const dummyCanMatch: CanMatchFn = (route, segment) =>{
  const router = inject(Router);
  const random = Math.random();
  if (random>0.5){
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes = [
  {
    path:'',
    component: NoTaskComponent,
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: userRoutes,
    canMatch:[dummyCanMatch],
    data: {
     message : 'hello',
    },
    runGuardsAndResolvers: 'always',
    resolve:  {
      userName: resolveUserName,
    },
    title : resolveTitle,
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
]
