import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../user-management.service';
import { Router } from '@angular/router';
import { User } from 'src/templates/user';

@Component({
  selector: 'app-user-account-page',
  templateUrl: './user-account-page.component.html',
  styleUrls: ['./user-account-page.component.css'],
})
export class UserAccountPageComponent implements OnInit {
  // page variables
  user: User;
  loadPage: boolean; // to stop page from loading before needed data is loaded
  username: string; // displayed in html. here in case user doesn't have a username

  constructor(
    private userService: UserManagementService,
    private router: Router
  ) {
    this.user = this.userService.user;
    this.loadPage = false;
    this.username = "";
  }

  ngOnInit(): void {
    // Check that user is signed in before displaying page
    if (!this.userService.userIsLoggedIn) {
      this.router.navigate(['/login']);
    }

    // BUG: getting this.user undefined error when user first logs in and gets redirected to this page
    // Note: everything goes INSIDE the 'else' if the user must be loggged in
    else {
      // Determine what to display for username fields
      if (this.user.user_profile_info) {
        // User has username
        if (this.user.user_profile_info.username) {
          this.username = this.user.user_profile_info.username;
        }
        // user doesn't have username
        else {
          this.username = this.user.user_email.split('@')[0];
        }
      }

      // user doesn't have user_profile_info
      else {
        this.username = this.user.user_email.split('@')[0];
      }

      // This goes in LAST
      this.loadPage = true;
    }
  }

  // Simple Method to Log User Out
  logout() {
    this.userService.logoutUser();
  }
}
