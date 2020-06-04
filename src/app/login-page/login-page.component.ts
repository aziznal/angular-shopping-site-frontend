import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserManagementService } from '../user-management.service';
import { User } from '../../templates/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  // Page Variables
  user = {} as User;
  success = false;
  failed = false;

  bad_email = false; // for email field
  bad_password = false; // for password filed

  constructor(
    private userService: UserManagementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check to see if user accessing this page is already signed in
    // If Yes, then redirect them to user-account immediately
    if (this.userService.userIsLoggedIn) {
      this.router.navigate(['/user-account']);
    }
  }

  checkEmailField() {
    // Confirm not-empty, then remove warnings
    if (this.user.user_email) {
      this.bad_email = false;
      this.bad_password = false;
    }
  }

  checkPasswordField() {
    // Confirm not-empty, then remove warnings
    if (this.user.user_password) {
      this.bad_password = false;
    }
  }

  // Confirm fields not-empty
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
            document.location.reload();
            break;

          // Bad Password
          case 401:
            this.bad_password = true;
            break;

          // No account exists
          case 404:
            this.failed = true;
            break;

          default:
            console.log('Unknown response recieved from server.');
            console.log(JSON.stringify(response, null, 2));
        }
      });
    }
    // If form is invalid
    else {
      // Check which field is invalid
      if (!this.user.user_email) {
        this.bad_email = true;
      } else if (!this.user.user_password) {
        this.bad_password = true;
      }
    }
  }
}
