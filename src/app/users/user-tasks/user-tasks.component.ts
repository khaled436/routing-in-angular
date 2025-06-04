import {Component, DestroyRef, inject, input, OnInit} from '@angular/core';
import {UsersService} from "../users.service";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot
} from "@angular/router";

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [
    RouterOutlet,
    RouterLink
  ]
})
export class UserTasksComponent {

  private readonly activeRoute = inject(ActivatedRoute);

  userName = input.required<string>();
  message = input.required<string>();

  // ngOnInit(): void {
  //   this.activeRoute.data.subscribe({
  //     next: data => {
  //       console.log(data)}
  //   })
  // }

}


export const resolveUserName: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) => {
  const userService  = inject(UsersService);
  return userService.users.find((user) => user.id === activatedRoute.paramMap.get('userId'))?.name || '';
}
