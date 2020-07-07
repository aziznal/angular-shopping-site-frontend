import { Component, OnInit, Input } from '@angular/core';
import { UserManagementService } from '../user-management.service';
import { Router } from '@angular/router';
import { User } from 'src/templates/user';

@Component({
  selector: 'app-user-account-page',
  templateUrl: './user-account-page.component.html',
  styleUrls: ['./user-account-page.component.css'],
})

// TODO: make transitions between subsections smoother (no page reloads)

export class UserAccountPageComponent implements OnInit {
  // page variables
  user: User;
  username: string; // displayed in html. here in case user doesn't have a username
  loadPage: boolean;

  constructor (
    private userService: UserManagementService,
    private router: Router
  ) {

    // GLITCH: This component's constructor and ngOnInit are being called before the parent component
    this.user = this.userService.user;
    console.log(JSON.stringify(this.user, null, 2));
    this.username = "";
  }

  async ngOnInit() {

    // If not loaded yet, then wait and let service load it.
    if (!this.user) {

      /*
      a certain glitch happens when the user first logs in and is redirected
      to this page. this code makes the glith go away.
      */

      await this.userService.checkLoggedIn();
      this.user = this.userService.user;
    }

    // Check that user is signed in before displaying page
    if (!this.userService.userIsLoggedIn) {
      this.router.navigate(['/login']);
    }

    // everything goes INSIDE the `else` if the user must be loggged in
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

      // Allow page to render after everything is ready
      this.loadPage = true;
    }
  }

  // Simple Method to Log User Out
  logout() {
    this.userService.logoutUser();
  }
}
