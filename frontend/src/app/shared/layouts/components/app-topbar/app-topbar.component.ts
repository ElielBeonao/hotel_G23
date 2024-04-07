import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../../../../core/auth/account.service';
import { LoginService } from '../../../../core/services/login.service';
import { Router } from '@angular/router';
import { Account } from '../../../../core/model/user-account.model';
import { Observable, Subscription, of } from 'rxjs';
// import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-topbar',
  templateUrl: './app-topbar.component.html',
  styleUrl: './app-topbar.component.scss'
})
export class AppTopbarComponent implements OnInit {

  // currentUsername: string = '';
  account: Account | null = null;
  // authSubscription?: Subscription;
  isAuthenticated: boolean = false;

  constructor(protected accountService: AccountService, protected loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    // this.isAuthenticated = this.accountService.isAuthenticated();
    // this.accountService.getAuthenticationState().subscribe(account => {
    //   this.account = account; 
    //   this.isAuthenticated = account !== null;
    //   console.log('>>>>', account);
    // });
    this.account = this.accountService.getAuthenticationState();
    this.isAuthenticated = this.accountService.isAuthenticated();
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/authentication/login']);
  }
}
