import { Component, OnInit } from '@angular/core';

import { UserManagementService } from '../user-management.service';
import { CartServiceService } from '../cart-service.service';

import { links } from './links';
import { categories } from './categories';

@Component({
  selector: 'app-top-side',
  templateUrl: './top-side.component.html',
  styleUrls: ['./top-side.component.css'],
})
export class TopSideComponent implements OnInit {
  // ### Page Variables
  links = links;
  categories = categories;
  itemCount: number;
  accountButtonText: string;
  accountButtonLink: string;

  constructor(
    private userService: UserManagementService,
    private userCart: CartServiceService
  ) {
    this.accountButtonText = 'Account';
    this.accountButtonLink = '/login';
  }

  ngOnInit(): void {
    // check if user is logged in
    if (this.userService.userIsLoggedIn) {
      // ### Displaying Username
      // check whether user has provided a username
      if (this.userService.user.user_profile_info) {
        if (this.userService.user.user_profile_info.username) {
          this.accountButtonText = this.userService.user.user_profile_info.username;
        } else {
          // if user has no username, then use their email (only before the @);
          this.accountButtonText = this.userService.user.user_email.split(
            '@'
          )[0];
        }
      } else {
        // if user has no profile info, then use their email (only before the @);
        this.accountButtonText = this.userService.user.user_email.split('@')[0];
      }

      // Set the appropriate link to the user's account's page
      this.accountButtonLink = '/user-account';

      // Set a value to itemCounter on the cart button
      if (this.userService.user.cart) {
        this.itemCount = this.userService.user.cart.length;

        // Check for new item count in cart every 500ms to keep the counter updated
        setInterval(() => { this.itemCount = this.userService.user.cart.length }, 500);

      // if User doesn't have a cart
      } else {
        this.itemCount = 0;
      }
    } else {
      // if Logged OUT
      this.accountButtonText = 'Sign in';
      this.accountButtonLink = '/login';
    }
  }
}
