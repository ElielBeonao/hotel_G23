import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    console.log(JSON.stringify(req));
    return next(req);
  }

  /**
   * Authentication Interceptor
   * @param req 
   * @param next 
   * @returns 
   */
export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    // Inject the current `AuthService` and use it to get an authentication token:
    const token = localStorage.getItem('authenticationToken') || sessionStorage.getItem('authenticationToken');
    // Clone the request to add the authentication header.
    // const newReq = req.clone({headers: {
    //   req.headers.append('Authorization', token),
    // }});
    if(token){
        req = req.clone({
            setHeaders: {
            Authorization: 'Bearer ' + token,
            // 'Access-Control-Allow-Origin': '*',
            },
        });
    }

    return next(req);
}

// Error Interceptor 403, 401, 500
export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  
    return next(req);
}