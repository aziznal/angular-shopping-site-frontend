import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { UserManagementService } from '../user-management.service';
import { User } from 'src/templates/user';

@Component({
  selector: 'app-create-account-page',
  templateUrl: './create-account-page.component.html',
  styleUrls: ['./create-account-page.component.css'],
})
export class CreateAccountPageComponent implements OnInit {
  // page variables
  @ViewChild('passwordHintsPopup', { read: ElementRef })
  passwordHintsPopup: ElementRef<any>;

  user = {} as User;

  success: boolean; // on account created successfully
  failed: boolean; // on failed to create account
  accountAlreadyExists: boolean;

  formHasBeenTouched: boolean; // true if at least one field was changed
  tempPassword: string;
  badPasswordMessage: string;

  field_checks: {
    bad_email: boolean;
    bad_password: boolean;
    bad_pass_confirmation: boolean;
  };

  constructor(
    private userService: UserManagementService,
    private router: Router
  ) {
    this.success = false;
    this.failed = false;
    this.accountAlreadyExists = false;

    this.formHasBeenTouched = false;
    this.tempPassword = '';
    this.badPasswordMessage = '';

    this.field_checks = {
      bad_email: false,
      bad_password: false,
      bad_pass_confirmation: false,
    };
  }

  private checkLoggedIn() {
    if (this.userService.userIsLoggedIn) {
      // TODO: use redirect to get user back to this page
      this.router.navigate(['/user-account']);
    }
  }

  ngOnInit(): void {
    this.checkLoggedIn();
  }

  checkEmailField() {
    const check = () => {
      this.field_checks.bad_email = true;
    };

    // Assuming an email at minimum is of the form a@b.c
    // check defined
    if (!this.user.user_email) return check();

    // a@b.c is five chars at least
    if (!(this.user.user_email.length >= 5)) return check();

    // [a, b.c] has length two every single time
    if (!(this.user.user_email.split('@').length == 2)) return check();

    // [b, c] has at least length 2 everytime
    if (!(this.user.user_email.split('@')[1].split('.').length >= 2))
      return check();

    this.field_checks.bad_email = false;
    this.formHasBeenTouched = true;
  }

  checkPasswordField() {
    const check = (message: string) => {
      this.field_checks.bad_password = true;
      this.badPasswordMessage = message;
    };

    // Password is defined
    if (!this.user.user_password)
      return check("There's like two field you have to fill up, dude.");

    // is 8+ chars
    if (this.user.user_password.length < 8)
      return check('Password must be 8+ chars, can you count to 8?');

    // does not contain any spaces
    if (this.user.user_password.split(' ').length > 1)
      return check('No social distancing between password characters');

    // is not stupid
    if (['password', '12345678'].includes(this.user.user_password))
      return check(
        'Your password is stupid. please pick a different password.'
      );

    this.field_checks.bad_password = false;
    this.formHasBeenTouched = true;
  }

  checkConfirmPasswordField() {
    // Check nothing if user still hasn't entered the first field
    if (!this.user.user_password) return;

    // Check only when user "seems" to have finished writing the confirmation
    if (this.tempPassword.length >= this.user.user_password.length) {
      this.field_checks.bad_pass_confirmation =
        this.tempPassword != this.user.user_password;
    }
  }

  private checkAllTestsPassed() {
    let checks: boolean[] = [];

    Object.keys(this.field_checks).map((val, i) => {
      checks[i] = this.field_checks[val];
    });

    return checks.every((v) => {
      return !v;
    });
  }

  private handleResponse(response) {
    switch (response.status) {
      // TODO: change below section after backend refactor.
      // if server sends a json then it won't have a response.status (which is stupidly designed by me)
      case 201:
      case undefined:
        this.success = true;

        // Show success page, then redirect user to update their info
        // TODO: log user into their account as soon as its successfully created
        const redirect = () => {
          this.router.navigate(['/user-account/update-info']);
        };
        setTimeout(redirect, 5000);
        break;

      case 409:
        this.failed = true;
        this.accountAlreadyExists = true;
        break;

      case 500:
        this.failed = true;
        break;

      default:
        console.log('Unhandled Server Response');
        console.log(JSON.stringify(response, null, 2));
    }
  }

  onSubmit() {
    if (this.formHasBeenTouched && this.checkAllTestsPassed()) {
      this.userService.createNewUser(this.user, (response) => {
        this.handleResponse(response);
      });
    }
  }
}
