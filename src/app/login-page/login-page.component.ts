import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserManagementService } from '../user-management.service';


// TODO: delete this
import { CookieService } from 'ngx-cookie-service';

import { User } from '../../templates/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private userService: UserManagementService,
    private router: Router,

    // TODO: delete this
    private cookieService: CookieService
    ) {}

  // Page Variables
  user = {} as User;
  success = false;
  failed = false;

  bad_email = false;      // for email field
  bad_password = false;   // for password filed

  ngOnInit(): void {

    // Check to see if user accessing this page is already signed in
    // If Yes, then redirect them to user-account immediately
    if (this.userService.userIsLoggedIn){
      this.router.navigate(['/user-account']);
    }

  }

  checkEmailField(){
    // If there's something in there, then remove warnings
    if (this.user.user_email){
      this.bad_email = false;
      this.bad_password = false;
    }
  }

  checkPasswordField(){
    // Remove warning on any change
    if (this.user.user_password){
      this.bad_password = false;
    }
  }

  // Check fields are at least populated with something
  validateForm(): boolean {
    if (this.user.user_email && this.user.user_password) return true;
  }

  // Form Submit Handler
  onSubmit() {
    if (this.validateForm()) {
      this.userService.loginUser(this.user, (response: Response) => {
        switch (response.status) {

          // Success
          case 200:
            this.success = true;
            this.userService.userIsLoggedIn = true;
            this.userService.user = this.user;
            console.log(response['msg']);
            document.location.reload();
            break;

          // Bad Password
          case 401:
            this.bad_password = true;
            console.log("User entered wrong password");
            break;

          // No account exists
          case 404:
            console.log("\nNo Users Exist with the given credentials\n");
            this.failed = true;
            break;

          default:
            console.log('Unknown response recieved from server.');
            console.log(JSON.stringify(response, null, 2));
        }
      });

    } else {

      // Check which field is undefined
      if (!this.user.user_email){
        this.bad_email = true;
      } else if (!this.user.user_password){
        this.bad_password = true;
      }

    }
  }

}
