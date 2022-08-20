import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model : any = {}

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

  login() {
    // it returns observable object, and observable is "lazy"
    // we need to subscribe to the observable in order to make it usable
    this.accountService.login(this.model).subscribe({
      next: response => {
        console.log(response);
      },
      error: error => {
        console.log(error);
      }
    });  

    // below is deprecated method
    // this.accountService.login(this.model).subscribe(response => {
    //   console.log(response);
    //   this.isLoggedIn = true;
    // }, error => {
    //   console.log(error);
    // });
  }

  logout() {
    this.accountService.logout();
  }
}

