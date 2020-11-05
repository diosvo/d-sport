import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

declare var $: any;

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {

  users: any = {
    page: 0,
    size: 10,
    totalPage: 0,
    count: 0,
    users: []
  };
  kw = '';
  userId = 0;
  message ='';
  
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.searchUser(1);

  }

  searchUser(cPage) {
    let page = cPage;
    let size = 5;
    let keyword = this.kw;

    this.adminService.getUsers(page,size,keyword).subscribe((user: any) => {
      this.users = user;
    });
  }
  
  searchPrevious() {
    if (this.users.page > 1) {
      let nextPage = this.users.page - 1;
      
      let page = nextPage;
      let size = 5;
      let keyword = this.kw;

      this.adminService.getUsers(page,size,keyword).subscribe((user: any) => {
        this.users = user
      });
    } else {
      this.showWarning("You're in the first page");
    }
  }

  searchNext() {
    if (this.users.page < this.users.totalPage) {
      let nextPage = this.users.page + 1;

      let page = nextPage;
      let size = 5;
      let keyword = this.kw;
      this.adminService.getUsers(page,size,keyword).subscribe((user: any) => {
        this.users = user
      });
    }
    else{
      this.showWarning("You're in the last page");
    }
  }

  deleteUser() {
    this.adminService.deleteUser(this.userId).subscribe(result => {
      var res: any = result;
      if (res.success) {
        $('#deleteModal').modal("hide");
        this.showMessage(res.message);
      }
    })
  }

  deleteModal(id) {
    $('#deleteModal').modal("show");
    this.userId = id;
  }

  showMessage(message){
    this.message = message;
    $("#successModal").modal("show");
    setTimeout(function(){ $("#successModal").modal("hide"); }, 1500);
    setTimeout(function(){ location.reload(); }, 1500);
  }

  showWarning(message){
    this.message = message;
    $("#warningModal").modal("show");
    setTimeout(function(){ $("#warningModal").modal("hide"); }, 1500);
  }

}
