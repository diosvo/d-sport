import { Component, OnInit } from '@angular/core';
import { ServerResponse, UserModelServer } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
})
export class AdminUserComponent implements OnInit {

  users: UserModelServer[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((user: ServerResponse) => {
      this.users = user.users
    })
  }

}
