import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {CurrentUserInterface} from "../types/currentUser.interface";
import {environment} from "../../../../environments/environment";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(data: CurrentUserInterface): Observable<CurrentUserInterface> {
    const url = environment.serverUrl + '/api/login';
    return this.http.post<CurrentUserInterface>(url, data);
  }

}
