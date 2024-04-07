// import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

// import { Account } from '../user/account.model';
import { AccountService } from '../auth/account.service';
import { AuthServerProvider } from '../auth/auth-jwt.service';
import { Login } from '../model/login.model';
import { Account } from '../model/user-account.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private accountService: AccountService,
              private http: HttpClient,
              private authServerProvider: AuthServerProvider) {}

  login(credentials: Login): Observable<Account | null> {
    return this.authServerProvider.login(credentials).pipe(flatMap(() => this.accountService.identity(true)));
  }

  register(register: any): Observable<{}> {
    return this.http.post(`/api/register`, register);
  }

  initResetPassword(mail: string): Observable<{}> {
    return this.accountService.resetPasswordInit(mail);
  }

  finishResetPassword(oldPassword: string, key: string, newPassword: string): Observable<{}> {
    return this.accountService.resetPasswordFinish(oldPassword, key, newPassword);
  }

  logout(): void {
    this.authServerProvider.logout().subscribe(null, null, () => this.accountService.authenticate(null));
    
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('authenticationToken') || sessionStorage.getItem('authenticationToken');

    return token !== undefined;
  }
}