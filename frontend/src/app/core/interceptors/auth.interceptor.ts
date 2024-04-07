import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

@Injectable({ providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('authenticationToken') || sessionStorage.getItem('authenticationToken');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token,
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
    return next.handle(request);
  }
}