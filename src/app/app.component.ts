import { Component, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  signedIn$: BehaviorSubject<boolean>;
  isMenuCollapsed: boolean = true;
  
  constructor(private authService: AuthService) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.signedIn$ = this.authService.signedin$;
    }
  }

  ngOnInit() {
    this.authService.loggedIn();

    this.authService.signedin$.subscribe((signedIn) => {
      this.signedIn$ = signedIn;
    });
  }

  
}
