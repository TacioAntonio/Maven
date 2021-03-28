import { Component, OnInit } from "@angular/core";
import { AdminCollectUsersPageService } from './adminCollectUsersPage.service';
import { IUserLogged } from 'src/app/shared/models/user';
import { Router } from '@angular/router';


@Component({
  templateUrl: 'adminCollectUsersPage.component.html',
  styleUrls: ['adminCollectUsersPage.component.css']
})
export class AdminCollectUsersPageComponent implements OnInit {
  users: IUserLogged[];

  constructor(private route: Router, private adminCollectUsersPageService: AdminCollectUsersPageService) { }

  ngOnInit(): void {
    this.collectUsers();
  }

  collectUsers(): void {
    this.adminCollectUsersPageService.collectUsers().subscribe({
      next: users => {
        this.users = users['user'];
      },
      error: err => console.error(err)
    });
  }

  deleteUser(id: string): void {
    this.adminCollectUsersPageService.deleteUser(id).subscribe({
      next: _ => {
        this.collectUsers();
      },
      error: err => console.error(err)
    });
  }

  updateUser(id: string): void {
    this.route.navigate(['admin/updateTheUser', id]);
  }
}
