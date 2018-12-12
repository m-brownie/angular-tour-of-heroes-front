import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { HttpInterceptor, 
         HttpRequest, 
         HttpHandler,
         HttpResponse,
         HttpErrorResponse,
         HttpEvent } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { map, catchError } from 'rxjs/operators';
import { MainService } from './main.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private token: TokenStorageService, private router: Router,
              private mainService: MainService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;

    if (this.token.getToken() != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.token.getToken())});
    }

    return next.handle(authReq).pipe(
      map((event: HttpEvent<any>) => {
        if(event instanceof HttpResponse) {
          _ => this.mainService.log(`Valide HTTP Request`)
        }
        return event;
      }),
      catchError((event: HttpErrorResponse) => {
        if(event.status === 401) {
          this.router.navigate(['login']);
        }
        return throwError(event);
      })
    );
  }
}
