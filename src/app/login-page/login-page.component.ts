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
  constructor(
    private userService: UserManagementService,
    private router: Router
    ) {}

  // Page Variables
  user = {} as User;
  success = false;
  failed = false;

  bad_email = false;
  bad_password = false;

  ngOnInit(): void {}

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
      this.userService.loginUser(this.user, (response) => {
        switch (response.status) {

          // Success
          case 200:
            this.success = true;
            console.log("User successfully logged in");
            this.router.navigate(['/']);
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
