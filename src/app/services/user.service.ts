import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../user';
import { MainService } from './main.service';

@Injectable({ providedIn: 'root' })
export class UserService {

  private userUrl: string = 'http://localhost:8080/users';

  constructor(private http: HttpClient,
              private mainService: MainService) { }

  public getUsers(): Observable<User[]> {
    const url: string = this.userUrl;

    return this.http.get<User[]>(url)
      .pipe(
        tap(_ => this.mainService.log('fetched users')),
        catchError(this.mainService.handleError('getUsers', []))
      );
  }
}
