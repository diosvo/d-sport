import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    }
  }
}