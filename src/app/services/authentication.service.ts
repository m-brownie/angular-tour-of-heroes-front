import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MainService } from './main.service';
import { Observable } from 'rxjs';

import { AuthToken } from '../authToken';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private authenticationUrl = 'http://localhost:8080/token';

  constructor(private http: HttpClient,
              private mainService: MainService) { }

  attemptAuth(formUsername: string, formPassword: string): Observable<AuthToken> {
    const url: string = `${this.authenticationUrl}/generate-token`;
    
    const credentials = {
      username: formUsername,
      password: formPassword
    }

    return this.http.post<AuthToken>(url, credentials)
      .pipe(
        tap(_ => this.mainService.log('attempting to authenticate')),
        catchError(this.mainService.handleError<AuthToken>('attemptAuth'))
      );
  }
}
