import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserManagementService } from 'src/app/user-management.service';
import { Router } from '@angular/router';
import { User } from 'src/templates/user';

@Component({
  selector: 'app-update-info-page',
  templateUrl: './update-info-page.component.html',
  styleUrls: ['./update-info-page.component.css'],
})
export class UpdateInfoPageComponent implements OnInit {
  // page variables
  user: User;
  agesDropdownMenu: number[];

  // To show a warning message over any fields that are 'bad'
  badFieldFlags: {} | any;

  // Determines whether the user wants to fill in a certain field
  activeFieldFlags: {} | any;

  constructor(
    private userService: UserManagementService,
    private router: Router
  ) {
    this.user = this.userService.user;

    this.badFieldFlags = {
      username: false,
      age: false,
      phone: false,
      gender: false,
    };

    this.activeFieldFlags = {
      username: true,
      age: true,
      phone: true,
      gender: true,
    };

    this.createAgeList();
  }

  private createAgeList() {
    // creates an array with numbers from 1 to 100 for use in html
    this.agesDropdownMenu = Array(100)
      .fill(0)
      .map((_, index) => index + 1);
  }

  ngOnInit(): void {
    // Check that user is signed in before displaying page
    if (!this.userService.userIsLoggedIn) {
      this.router.navigate(['/login']);
    }

    // init this in case the user hasn't visited this page before
    if (!this.user.user_profile_info) {
      this.user.user_profile_info = {};
    }
  }

  //#region Enable/Disable Fields
  @ViewChild('usernameField', { read: ElementRef }) usernameField: ElementRef<
    any
  >;
  @ViewChild('phoneField', { read: ElementRef }) phoneField: ElementRef<any>;
  @ViewChild('ageField', { read: ElementRef }) ageField: ElementRef<any>;
  @ViewChild('genderField', { read: ElementRef }) genderField: ElementRef<any>;

  toggleUsernameField() {
    this.usernameField.nativeElement.disabled = !this.usernameField
      .nativeElement.disabled;
  }

  togglePhoneField() {
    this.phoneField.nativeElement.disabled = !this.phoneField.nativeElement
      .disabled;
  }

  toggleAgeField() {
    this.ageField.nativeElement.disabled = !this.ageField.nativeElement
      .disabled;
  }

  toggleGenderField() {
    this.genderField.nativeElement.disabled = !this.genderField.nativeElement
      .disabled;
  }

  private deleteDisabledFields() {
    // This completely removes disabled fields from user's profile info
    Object.keys(this.activeFieldFlags).map((key, _) => {
      if (!this.activeFieldFlags[key]) {
        delete this.user.user_profile_info[key];
      }
    });
  }

  //#endregion Enable/Disable Fields

  //#region Field Validation

  // TODO: add message to each field check showing why they can't be accepted

  // Validate username field
  checkUsernameField() {
    const flag = () => {
      this.badFieldFlags.username = true;
    };

    // Length must be less than 16 chars
    if (!(this.user.user_profile_info.username.length <= 64)) return flag();

    // No spaces may be present in username
    if (this.user.user_profile_info.username.indexOf(' ') >= 0) return flag();
  }

  // Validate age field
  checkAgeField() {
    const flag = () => {
      this.badFieldFlags.age = true;
    };

    // Age must be a number between 0 and 150
    if (this.user.user_profile_info.age < 0) return flag();
    if (this.user.user_profile_info.age > 150) return flag();

    // Make sure the passed value is a number
    if (isNaN(this.user.user_profile_info.age)) return flag();

    // and is an Integer
    if (!Number.isInteger(this.user.user_profile_info.age)) return flag();
  }

  // Validate Gender
  checkGenderField() {
    const flag = () => {
      this.badFieldFlags.gender = true;
    };

    // NOTE: a user can "inject" whatever they want in an option and pass it off that way
    if (
      this.user.user_profile_info.gender != 'F' &&
      this.user.user_profile_info.gender != 'M'
    )
      return flag();
  }

  // Validate Phone number field
  checkTelephoneField() {
    const flag = () => {
      this.badFieldFlags.phone = true;
    };

    // Input must all be numbers, and must be under 12 digits
    if (isNaN(+this.user.user_profile_info.phone)) return flag();
  }
  //#endregion Field Validation

  async updateButtonOnClick() {
    this.deleteDisabledFields();

    await this.userService.updateUserInfo(this.user);


    document.location.reload();
  }
}
