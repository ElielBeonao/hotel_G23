import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, ReplaySubject, of } from 'rxjs';
import { shareReplay, tap, catchError, map, startWith } from 'rxjs/operators';
import { AuthServerProvider } from './auth-jwt.service';
import { Account } from '../model/user-account.model';
import { StateStorageService } from './state-storage.service';
import { ICompteUtilisateur } from '../../shared/models/compte-utilisateur.model';

@Injectable({ providedIn: 'root' })
export class AccountService {

  private userIdentity: Account | null = null;
  // private authenticationState = new ReplaySubject<Account | null>(1);
  private authenticationState = new BehaviorSubject<Account | null>(null);
  private accountCache$?: Observable<Account | null>;

  constructor(
    private authServerProvider: AuthServerProvider,
    // private sessionStorage: SessionStorageService,
    private http: HttpClient,
    private stateStorageService: StateStorageService,
    private router: Router
  ) {}

  save(account: Account): Observable<{}> {
    return this.http.post(`/api/account`, account);
  }

  authenticate(identity: Account | null): void {
    this.userIdentity = identity;
    this.authenticationState.next(this.userIdentity);
    localStorage.setItem('authenticationState', JSON.stringify(this.userIdentity));
  }

  // authenticate(identity: Account | null): void {
  //   console.info('authenticate');
  //   this.userIdentity = identity;
  //   this.authenticationState.next(this.userIdentity);
  //   // console.info('After Auth:',this.authenticationState.value);
  // }


  resetPasswordInit(mail: string): Observable<{}> {
    return this.http.post(`/api/account/reset-password/init`, mail);
  }

  resetPasswordFinish(oldPassword: string, key: string, newPassword: string): Observable<{}> {
    return this.http.post(`/api/account/reset-password/finish`, { oldPassword, key, newPassword });
  }

  hasAnyAuthority(authorities: string[] | string): boolean {
    // console.info('Has Any Authority invoked!');
    // console.info('@',this.authenticationState.value?.userType!);
    const currentUserInfos = this.getAuthenticationState();
    if (!currentUserInfos || !currentUserInfos.userType) {
      return false;
    }
    if (!Array.isArray(authorities)) {
      authorities = [authorities];
    }

    // return authorities.includes(this.userIdentity.userType);
    // console.info(authorities.includes(this.authenticationState.value?.userType!));
    
    return authorities.includes(currentUserInfos.userType!);
  }

  identity(force?: boolean): Observable<Account | null> {
    if (!this.accountCache$ || force || !this.isAuthenticated()) {
      // console.info('identity');
      this.accountCache$ = this.fetch().pipe(
        catchError(() => {
          return of(null);
        }),
        tap((account: Account | null) => {
          this.authenticate(account);

          
          if (account) {
            this.navigateToStoredUrl();
          }
        }),
        shareReplay()
      );
    }
    return this.accountCache$;
  }

  currentUser(): Observable<ICompteUtilisateur | null> {
    return this.http.get<ICompteUtilisateur>(`/api/account/me`);
  }


  // isAuthenticated(): boolean {
  //   return this.userIdentity !== null;
  // }

  // getAuthenticationState(): Observable<Account | null> {
  //   return this.authenticationState.asObservable();
  // }



  isAuthenticated(): boolean {
    const user = JSON.parse(localStorage.getItem('authenticationState')!) ?? null;
    // console.info('isAuthenticated', user !== null);
    return user !== null;
  }

  // getAuthenticatedUser(): Account | null {
  //   return this.userIdentity;
  // }

  // getAuthenticationState(): Observable<Account | null> {
  //   return this.authenticationState.asObservable();
  // }

  getAuthenticationState(): Account | null {
    const storedAccount = localStorage.getItem('authenticationState');
    const initialState = storedAccount ? JSON.parse(storedAccount) : null;
    return initialState;
    // return this.authenticationState.asObservable().pipe(
    //   startWith(initialState)
    // );
  }


  getUserName(): string {
    return this.userIdentity ? this.userIdentity.id : '';
  }

  getUserFullName(): string {
    return this.userIdentity ? this.userIdentity.fullName  : '';
  }

  private fetch(): Observable<Account> {
    return this.http.get<Account>(`/api/account/me`);
  }

  private navigateToStoredUrl(): void {
    // previousState can be set in the authExpiredInterceptor and in the userRouteAccessService
    // if login is successful, go to stored previousState and clear previousState
    const previousUrl = this.stateStorageService.getUrl();
    if (previousUrl) {
      this.stateStorageService.clearUrl();
      this.router.navigateByUrl(previousUrl);
    }
  }
}