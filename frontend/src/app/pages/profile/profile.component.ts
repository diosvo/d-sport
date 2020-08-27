import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserModelServer } from 'src/app/models/user.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  myUser: any;


  constructor(
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.userService.userData$
      .pipe(
        map((user: UserModelServer) => {
          return user;
        })
      )
      .subscribe((data: UserModelServer) => {
        this.myUser = data;
      });
    console.log(this.myUser)
  }

  logout() {
    this.userService.logout();
  }
}