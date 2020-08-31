import { Component, OnInit, HostListener } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';

declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isLoggedIn = false
  email: string

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser()
      this.email = user.email
    }
  }

  logout() {
    this.tokenStorageService.signout()
    window.location.reload();
  }

/*   clickOutside() {
    window.addEventListener('click', () => {
      var hide = document.getElementById('navbar')
      if (event.target != hide && (<HTMLElement>event.target).parentElement != hide) {
        hide.style.display = 'none'
      }
    })
  } */
}
