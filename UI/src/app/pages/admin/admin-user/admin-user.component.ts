import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ServerResponse, UserModelServer } from 'src/app/models/user.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
})
export class AdminUserComponent implements OnInit {

  users: UserModelServer[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<UserModelServer> = new Subject();

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };

    this.adminService.getUsers().subscribe((user: ServerResponse) => {
      this.users = user.users
      this.dtTrigger.next()
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
