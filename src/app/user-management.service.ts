import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from 'src/templates/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  API_URL = '//localhost:3000'; // url of Backend API

  // Service Variables
  userIsLoggedIn = false;
  user = {} as User | any;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
    ) {}

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
      observe: 'response' as const,
      responseType: 'json' as const,
      withCredentials: true,
    };

    this.http.post(this.API_URL + '/user/login', user, reqOptions).subscribe(
      (response) => {
        this.user = response.body['user'];
        callback(response);
      },
      (err) => {
        callback(err);
      }
    );
  }

  // Log out any signed in user
  logoutUser() {
    this.cookieService.delete("session_id");
    this.cookieService.delete("user_email");

    document.location.reload();
  }

  // Check if user is still logged in
  checkLoggedIn() {

    return new Promise((resolve, reject) => {

      // These two cookies are what determines if the user is in an active session
      const session_id = this.cookieService.get('session_id');
      const user_email = this.cookieService.get('user_email');

      if (!session_id || !user_email){
        resolve(false);
      } else {
        const reqOptions = {
          observe: 'response' as const,
          responseType: 'json' as const,
          withCredentials: true
        }

        this.http.post(this.API_URL + '/user/login-validate', this.user, reqOptions).subscribe(
          (response) => {
            if (response.status == 200) {

              // Server sends back current user info as response (password not included)
              this.user = response.body['user'];
              resolve(true);
            }
          },
          (err) => {
            console.error(err);
          }
        )
      }
    })  // end of promise
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

  // Update User Info
  updateUserInfo(user: User) {

    return new Promise((resolve, reject) => {
      const reqOptions = {
        observe: 'response' as const,
        responseType: 'json' as const,
      };

      console.log("Here is the user object about to be sent to the backend: ");
      console.log(JSON.stringify(user, null, 2));

      this.http.put(this.API_URL + '/user/update', user, reqOptions).subscribe(
        (response) => {

          // if Successful
          if (response.status == 200){
            console.log(response.body['msg']);
            resolve();
          } else {
            console.log("Unhandled server response");
            console.log(JSON.stringify(response, null, 2));

            resolve();
          }

        },
        (error_response) => {
          console.log("Recieved error response from backend server");
          console.log(JSON.stringify(error_response, null, 2));
          resolve();
        }
      )
    })

  }

}
