import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from 'src/templates/user';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  // Service Variables
  BASE_API_URL: string; // url of Backend API
  API_URL: {} | any;

  userIsLoggedIn: boolean;
  user: User;

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.BASE_API_URL = '//localhost:3000';

    this.API_URL = {
      LOGIN: this.BASE_API_URL + '/user/login',
      VALIDATE_LOGIN: this.BASE_API_URL + '/user/login-validate',
      CREATE_USER: this.BASE_API_URL + '/user/create',
      UPDATE_USER_INFO: this.BASE_API_URL + '/user/update',
    };

    this.userIsLoggedIn = false;
    this.user = {} as User;
  }

  options: {
    headers?: HttpHeaders | { [header: string]: string | string[] };
    observe?: 'body' | 'events' | 'response';
    params?: HttpParams | { [param: string]: string | string[] };
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
  };

  // ### Normal User Sign-in
  normalUserLogin(user: User, callback) {
    const reqOptions = {
      observe: 'response' as const,
      responseType: 'json' as const,
      withCredentials: true,
    };

    this.http.post(this.API_URL.LOGIN, user, reqOptions).subscribe(
      (response) => {
        this.user = response.body['user'];
        callback(response);
      },
      (err) => {
        callback(err);
      }
    );
  }

  redirectedLogin(redirect_to: string): void {}

  // ### Normal User Logout (or after timeout)
  logoutUser() {
    this.cookieService.delete('session_id');
    this.cookieService.delete('user_email');

    document.location.reload();
  }

  private checkSessionIdExists() {
    return new Promise((resolve, reject) => {
      const session_id = this.cookieService.get('session_id');
      const user_email = this.cookieService.get('user_email');

      console.log('Found session id as: ' + session_id);

      if (session_id) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  private sendLoginValidationRequest() {
    return new Promise((resolve, reject) => {
      const reqOptions = {
        observe: 'response' as const,
        responseType: 'json' as const,
        withCredentials: true,
      };

      this.http
        .post(this.API_URL.VALIDATE_LOGIN, this.user, reqOptions)
        .subscribe(
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
        );
    });
  }

  checkUserIsStillLoggedIn() {
    return new Promise(async (resolve, reject) => {
      const sessionIdExists = await this.checkSessionIdExists();

      if (!sessionIdExists) {
        console.log('Session ID does not exist');
        resolve(false);
      } else {
        await this.sendLoginValidationRequest();
        resolve(true);
      }
    }); // end of promise
  }

  // ### Create New User
  createNewUser(user: User, callback) {
    const reqOptions = {
      observe: 'body' as const,
      responseType: 'json' as const,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    this.http.post(this.API_URL.CREATE_USER, user, reqOptions).subscribe(
      (response) => {
        callback(response);
      },
      (err) => {
        callback(err);
      }
    );
  }

  private handleUpdateResponse(response) {
    return new Promise((resolve, reject) => {
      // if Successful
      if (response.status == 200) {
        console.log(response.body['msg']);
        resolve();
      } else {
        console.log('Unhandled server response');
        console.log(JSON.stringify(response, null, 2));

        resolve();
      }
    });
  }

  // ### Update User Info
  updateUserInfo(user: User) {
    return new Promise((resolve, reject) => {
      const reqOptions = {
        observe: 'response' as const,
        responseType: 'json' as const,
      };

      this.http.put(this.API_URL.UPDATE_USER_INFO, user, reqOptions).subscribe(
        async (response) => {
          await this.handleUpdateResponse(response);
          resolve();
        },
        (error_response) => {
          console.log('Recieved error response from backend server');
          console.log(JSON.stringify(error_response, null, 2));
          resolve();
        }
      );
    });
  }
}
