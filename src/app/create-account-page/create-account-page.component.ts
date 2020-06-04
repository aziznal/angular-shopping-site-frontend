import { Component, OnInit } from '@angular/core';
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
  user = {} as User;

  // triggers elements in the html
  success = false; // Account created successfully
  failed = false; // Account Failed to be created
  already_exists = false;

  form_touched: boolean = false; // Whether at least one field was changed
  temp_password: string = '';

  // This holds "bad" flags for fields
  field_checks = {
    bad_email: false,
    bad_password: false,
    bad_pass_confirmation: false,
  };

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

  // Email field validation
  checkEmail() {
    const check = () => {
      this.field_checks.bad_email = true;
    };

    // Assuming an email at minimum is of the form a@b.c
    // check defined
    if (!this.user.user_email) return check();

    // a@b.c is five chars at least, so check it
    if (!(this.user.user_email.length >= 5)) return check();

    // [a, b.c] has length two every single time
    if (!(this.user.user_email.split('@').length == 2)) return check();

    // [b, c] has at least length 2 everytime
    if (!(this.user.user_email.split('@')[1].split('.').length >= 2))
      return check();

    this.field_checks.bad_email = false;
    this.form_touched = true;
  }

  // Password field validation
  checkPassword() {
    const check = () => {
      this.field_checks.bad_password = true;
    };

    // Password is defined
    if (!this.user.user_password) return check();

    // is 8+ chars
    if (this.user.user_password.length < 8) return check();

    // is not stupid
    // TODO: remove?
    if (['password', '12345678'].includes(this.user.user_password))
      return check();

    this.field_checks.bad_password = false;
    this.form_touched = true;
  }

  // Password Confirmation
  confrimPassword() {
    // Check nothing if user still hasn't entered the first field
    if (!this.user.user_password) return;

    // Check only when user "seems" to have finished writing the confirmation
    if (this.temp_password.length >= this.user.user_password.length) {
      this.field_checks.bad_pass_confirmation =
        this.temp_password != this.user.user_password;
    }
  }

  onSubmit() {
    let bad_vals = [];
    Object.keys(this.field_checks).map((val, i) => {
      bad_vals[i] = this.field_checks[val];
    });

    // Check that all tests have passed, and that at least one field has been "touched"
    if (
      bad_vals.every((v) => {
        return !v;
      }) &&
      this.form_touched
    ) {
      this.userService.createNewUser(this.user, (response) => {
        switch (response.status) {
          // if server sends a json then it won't have a response.status (which is stupidly designed by me)
          case 201:
          case undefined:
            this.success = true;

            // Show success page, then redirect user to update their info
            // TODO: log user into their account as soon as its successfully created, otherwise this reroute doesn't work
            const redirect = () => {
              this.router.navigate(['/user-account/update-info']);
            };
            setTimeout(redirect, 1000);
            break;

          case 409:
            this.failed = true;
            this.already_exists = true;
            break;

          case 500:
            this.failed = true;
            break;

          default:
            console.log('Unhandled Server Response');
            console.log(response);
        }
      });
    }
  }
}