import { Component, OnInit } from '@angular/core';
import { ServerResponse, UserModelServer } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
})
export class AdminUserComponent implements OnInit {

  users: UserModelServer[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getUsers().subscribe((user: ServerResponse) => {
      this.users = user.users
    })
  }
}
