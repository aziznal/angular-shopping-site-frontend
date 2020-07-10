import { Component, Output } from '@angular/core';
import { UserManagementService } from './user-management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // ### Page Varialbes
  pageCanLoad: boolean;

  constructor(private userService: UserManagementService) {
    this.pageCanLoad = false;
  }

  private async checkUserService() {
    /* Setting the user-signed-in check in here makes sure that it's
       going to be done before any components of the page have been loaded */

    const isLoggedIn = await this.userService.checkUserIsStillLoggedIn();

    if (isLoggedIn) this.userService.userIsLoggedIn = true;
    else this.userService.userIsLoggedIn = false;

  }

  async ngOnInit() {

    await this.checkUserService();

    this.pageCanLoad = true;
  }
}
