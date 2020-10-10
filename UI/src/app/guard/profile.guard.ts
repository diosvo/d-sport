import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private token: TokenStorageService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.token.isAuthenticated()) {
      this.userService.auth = true;
      return true
    }

    this.userService.auth = false;
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}