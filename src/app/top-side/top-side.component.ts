import { Component, OnInit } from '@angular/core';

import { UserManagementService } from '../user-management.service';

import { links } from "./links";
import { categories } from "./categories";

@Component({
  selector: 'app-top-side',
  templateUrl: './top-side.component.html',
  styleUrls: ['./top-side.component.css']
})
export class TopSideComponent implements OnInit {

  links = links;
  categories = categories;

  constructor(private userService: UserManagementService) { }

  accountButtonText = "Account";
  accountButtonLink = "/login";

  ngOnInit(): void {

    // check if user is logged in
    if (this.userService.userIsLoggedIn){

      // check whether user has provided a username
      if (this.userService.user.user_profile_info){

        if (this.userService.user.user_profile_info.username){
          this.accountButtonText = this.userService.user.user_profile_info.username;
        } else {
          // if user has no username, then use their email (only before the @);
          this.accountButtonText = this.userService.user.user_email.split('@')[0];
        }

      }

      else {
        // if user has no profile info, then use their email (only before the @);
        this.accountButtonText = this.userService.user.user_email.split('@')[0];
      }

      // Set the appropriate link to the user's account's page
      this.accountButtonLink = "/user-account"

    } else {

      // if Logged OUT
      this.accountButtonText = "Sign in";
      this.accountButtonLink = "/login";

    }

  }

}
