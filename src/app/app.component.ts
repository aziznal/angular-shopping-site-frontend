import { Component, Output } from '@angular/core';
import { UserManagementService } from './user-management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  // ### Page Varialbes
  loadPage: boolean;

  constructor(private userService: UserManagementService) {
    this.loadPage = false;
  }

  async ngOnInit() {
    /* Settings the user-signed-in check in here makes sure that it's
       going to be done before any components of the page have been loaded
    */

    console.log("App Component TS initting...");

    // check if user is logged in to modify service accordingly
    const isLoggedIn = await this.userService.checkLoggedIn();

    if (isLoggedIn) this.userService.userIsLoggedIn = true;
    else this.userService.userIsLoggedIn = false;

    this.loadPage = true;
  }

}
