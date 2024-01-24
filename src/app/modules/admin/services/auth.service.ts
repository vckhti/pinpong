import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import {AuthUserInterface} from '../shared/types/authUser.interface';
import {AuthBackendResponse} from '../shared/types/authBackendResponse';
import {PersistanceService} from "./persistance.service";
import {Observable, of} from "rxjs";
import {CurrentUserInterface} from "../shared/types/currentUser.interface";
import {catchError} from "rxjs/operators";
import {AlertService} from "../../../shared/services/alert.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private persistanceService: PersistanceService,
    private alert: AlertService
  ) { }

  login( user: AuthUserInterface ): Observable<CurrentUserInterface> {
    const url = environment.serverUrl + '/api/login';
    return this.http.post<any>(url,user).pipe(
      catchError((err) => {
        this.alert.danger('Сервеная ошибка');
        console.error(err);
        return of(null);
      })
    );
  }

  public setToken (response: AuthBackendResponse) {
    if (response) {
      const expDate = new Date().getTime() + 86400000;
      this.persistanceService.set('admin-exp', expDate);
      this.persistanceService.set('token', response.token);
    }
    if (!response) {
      this.persistanceService.delete();
    }
  }

  get token () {
    const expDate = (this.persistanceService.get('admin-exp'));
    if (expDate && (new Date().getTime()) > expDate ) {
      this.logout();
      return null;
    }
    return localStorage.getItem('token');
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated() {
    return !!this.token;
  }
}
