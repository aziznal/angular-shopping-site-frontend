import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from 'src/templates/user';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  API_URL = '//localhost:3000'; // url of Backend API

  constructor(private http: HttpClient) {}

  options: {
    headers?: HttpHeaders | { [header: string]: string | string[] };
    observe?: 'body' | 'events' | 'response';
    params?: HttpParams | { [param: string]: string | string[] };
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
  };

  // Log User In
  loginUser(user: User, callback) {
    const reqOptions = {
      observe: 'body' as const,
      responseType: 'json' as const,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    this.http.post(this.API_URL + '/user/login', user, reqOptions).subscribe(
      (response) => {
        callback(response);
      },
      (err) => {
        callback(err);
      }
    );
  }

  // Create New User
  createNewUser(user: User, callback){
    const reqOptions = {
      observe: 'body' as const,
      responseType: 'json' as const,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    this.http.post(this.API_URL + '/user/create', user, reqOptions).subscribe(
      (response) => {
        callback(response);
      },
      (err) => {
        callback(err);
      }
      )

  }

}
