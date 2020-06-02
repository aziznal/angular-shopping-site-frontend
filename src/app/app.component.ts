import { Component } from '@angular/core';
import { UserManagementService } from './user-management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private userService: UserManagementService) {}

  load_page = false;

  async ngOnInit() {

    // setTimeout(() => {
    //   this.load_page = true;
    // }, 1000)

    // check if user is logged in to modify service accordingly
    const isLoggedIn = await this.userService.checkLoggedIn();
    if (isLoggedIn) this.userService.userIsLoggedIn = true
    else this.userService.userIsLoggedIn = false;


    console.log("Current User isLoggedIn = " + this.userService.userIsLoggedIn);
    this.load_page = true;

  }
}
