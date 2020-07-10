import { Component, OnInit, Input } from '@angular/core';
import { UserManagementService } from '../user-management.service';
import { Router } from '@angular/router';
import { User } from 'src/templates/user';

@Component({
  selector: 'app-user-account-page',
  templateUrl: './user-account-page.component.html',
  styleUrls: ['./user-account-page.component.css'],
})

// GLITCH: This component's constructor and ngOnInit are being called before the parent component
export class UserAccountPageComponent implements OnInit {
  // page variables
  user: User;
  username: string; // displayed in html. used in case user doesn't have a username
  pageCanBeLoaded: boolean;

  constructor(
    private userService: UserManagementService,
    private router: Router
  ) {
    this.user = this.userService.user;
    this.username = '';
  }

  // Jerryrigged solution to weird bug
  private confirmUserServiceLoaded() {
    return new Promise(async (resolve, reject) => {
      /*
      a certain glitch happens when the user first logs in and is redirected
      to this page. this code makes the glitch go away.
      */

      await this.userService.checkUserIsStillLoggedIn();
      this.user = this.userService.user;

      resolve();
    });
  }

  private setUsernameFromEmail() {
    this.username = this.user.user_email.split('@')[0];
  }

  private setUsernameField() {
    if (this.user.user_profile_info) {
      // has username
      if (this.user.user_profile_info.username) {
        this.username = this.user.user_profile_info.username;
      }

      // hasn't username
      else {
        this.setUsernameFromEmail();
      }
    }

    // hasen't user_profile_info (brand new user - first sign in)
    else {
      this.setUsernameFromEmail();
    }
  }

  private confirmUserSignedIn() {
    if (!this.userService.userIsLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }

  async ngOnInit() {
    if (!this.user) await this.confirmUserServiceLoaded();

    if (!this.confirmUserSignedIn()) return;

    this.setUsernameField();

    // finally allow page to render
    this.pageCanBeLoaded = true;
  }

  // logout button handler
  logoutButtonOnClick() {
    this.userService.logoutUser();
  }
}
