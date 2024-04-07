import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

// import { LoginService } from '../../core/login/login.service';
import { StateStorageService } from '../../core/auth/state-storage.service';
import { LoginService } from '../services/login.service';

@Injectable({ providedIn: 'root'})
export class AuthExpiredInterceptor implements HttpInterceptor {

  constructor(
    private loginService: LoginService,
    private stateStorageService: StateStorageService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(null, (err: HttpErrorResponse) => {
        if (err.status === 401 && err.url && !err.url.includes('api/account')) {
          console.info('AuthExpiredInterceptor');
          this.stateStorageService.storeUrl(this.router.routerState.snapshot.url);
          this.loginService.logout();
          this.router.navigate(['/authentication/login']);
        }
      })
    );
  }
}