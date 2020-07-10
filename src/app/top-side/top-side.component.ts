import { Component, OnInit } from '@angular/core';

import { UserManagementService } from '../user-management.service';

import { links } from './links';
import { categories } from './categories';

@Component({
  selector: 'app-top-side',
  templateUrl: './top-side.component.html',
  styleUrls: ['./top-side.component.css'],
})
export class TopSideComponent implements OnInit {
  // ### Page Variables
  hotlinks = links;
  categories = categories;

  cartItemCount: number;

  accountButtonText: string;
  accountButtonLink: string;

  constructor(private userService: UserManagementService) {
    this.accountButtonText = 'Sign in';
    this.accountButtonLink = '/login';
  }

  private setUsernameFromUserEmail() {
    // if user has no username, then use their email (only before the @);
    this.accountButtonText = this.userService.user.user_email.split('@')[0];
  }

  private setUsernameFromProfileInfo() {
    if (this.userService.user.user_profile_info.username) {
      this.accountButtonText = this.userService.user.user_profile_info.username;
    } else {
      // If user doesn't have a username
      this.setUsernameFromUserEmail();
    }
  }

  private setAccountButtonText() {
    if (this.userService.user.user_profile_info) {
      this.setUsernameFromProfileInfo();
    } else {
      this.setUsernameFromUserEmail();
    }
  }

  private setCartItemCounterValue() {
    if (this.userService.user.cart) {
      this.cartItemCount = this.userService.user.cart.length;
    } else {
      // User has never used their cart before
      this.cartItemCount = 0;
    }
  }

  private setCartItemCountUpdater() {
    // Check for new item count in cart every 500ms to keep the counter updated
    setInterval(() => {
      this.cartItemCount = this.userService.user.cart.length;
    }, 500);
  }

  private intializeAccountAndCartButtons() {
    // Do nothing if user is not signed-in
    if (!this.userService.userIsLoggedIn) return;

    this.setAccountButtonText();

    // Set the appropriate link to the user's account's page
    this.accountButtonLink = '/user-account';

    this.setCartItemCounterValue();

    this.setCartItemCountUpdater();
  }

  ngOnInit(): void {
    this.intializeAccountAndCartButtons();
  }
}
