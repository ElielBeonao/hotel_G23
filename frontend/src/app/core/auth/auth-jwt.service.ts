import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// import { LocalStorageService, SessionStorageService } from "ngx-webstorage";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Register } from "../model/register.model";
import { Router } from "@angular/router";

type JwtToken = {
    access_token: string;
  };
type Login = {
    username: string;
    password: string;
    rememberMe: boolean;
  };

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {
  constructor(private router:Router, private http: HttpClient, 
    // private $localStorage: LocalStorageService, private $sessionStorage: SessionStorageService
    ) {}

  getToken(): string {

    // return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken') || '';
    return localStorage.getItem('authenticationToken') || sessionStorage.getItem('authenticationToken') || '';
  }

  login(credentials: Login): Observable<void> {
    return this.http
      .post<JwtToken>(`/api/login`, credentials)
      .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      // this.$localStorage.clear('authenticationToken');
      // this.$sessionStorage.clear('authenticationToken');
      localStorage.removeItem('authenticationToken');
      sessionStorage.removeItem('authenticationToken');
      localStorage.removeItem('authenticationState');
      
      observer.complete();
    });
  }

  private authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
    const jwt = response.access_token;
    if (rememberMe) {
      // this.$localStorage.store('authenticationToken', jwt);
      localStorage.setItem('authenticationToken', jwt);
    } else {
      // this.$sessionStorage.store('authenticationToken', jwt);
      sessionStorage.setItem('authenticationToken', jwt);
    }
  }
}
