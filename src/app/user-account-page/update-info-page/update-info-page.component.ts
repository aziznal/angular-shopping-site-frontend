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
  ages: number[];

  // To show a warning message over any fields that are 'bad'
  bad_fields;

  // Determines whether the user wants to fill in a certain field
  active_fields;

  constructor(
    private userService: UserManagementService,
    private router: Router
  ) {
    // get current user from userService
    this.user = this.userService.user;

    // Bad Field Flags
    this.bad_fields = {
      username: false,
      age: false,
      phone: false,
      gender: false,
    };

    // Active Field Flags
    this.active_fields = {
      username: true,
      age: true,
      phone: true,
      gender: true,
    };

    // creates an array with numbers from 1 to 100 for use in html
    this.ages = Array(100)
      .fill(0)
      .map((_, index) => index + 1);
  }

  //#region Enable/Disable Fields

  // Get fields from html
  @ViewChild('usernameField', { read: ElementRef }) usernameField: ElementRef<
    any
  >;
  @ViewChild('phoneField', { read: ElementRef }) phoneField: ElementRef<any>;
  @ViewChild('ageField', { read: ElementRef }) ageField: ElementRef<any>;
  @ViewChild('genderField', { read: ElementRef }) genderField: ElementRef<any>;

  disableUsernameField() {
    this.usernameField.nativeElement.disabled = !this.usernameField
      .nativeElement.disabled;
  }

  disablePhoneField() {
    this.phoneField.nativeElement.disabled = !this.phoneField.nativeElement
      .disabled;
  }

  disableAgeField() {
    this.ageField.nativeElement.disabled = !this.ageField.nativeElement
      .disabled;
  }

  disableGenderField() {
    this.genderField.nativeElement.disabled = !this.genderField.nativeElement
      .disabled;
  }

  // to run in onSubmit
  checkDisabledFields() {

    // user_profile_info has the same keys as active_fields object, making this code possible
    Object.keys(this.active_fields).map((key, _) => {
      if (this.active_fields[key] == false) {
        delete this.user.user_profile_info[key];
      }
    });
  }

  //#endregion Enable/Disable Fields

  //#region Field Validation

  // Validate username field
  checkFieldUserame() {
    const check = () => {
      this.bad_fields.username = true;
    };

    // Length must be less than 16 chars
    if (!(this.user.user_profile_info.username.length <= 64)) return check();

    // No spaces may be present in username
    if (this.user.user_profile_info.username.indexOf(' ') >= 0) return check();
  }

  // Validate age field
  checkFieldAge() {
    const check = () => {
      this.bad_fields.age = true;
    };

    // Age must be a number between 0 and 150
    if (this.user.user_profile_info.age < 0) return check();
    if (this.user.user_profile_info.age > 150) return check();

    // Make sure the passed value is a number
    if (isNaN(this.user.user_profile_info.age)) return check();

    // and is an Integer
    if (!Number.isInteger(this.user.user_profile_info.age)) return check();
  }

  // Validate Gender
  checkFieldGender() {
    const check = () => {
      this.bad_fields.gender = true;
    };

    // NOTE: a user can "inject" whatever they want in an option and pass it off that way
    if (this.user.user_profile_info.gender != "F" && this.user.user_profile_info.gender != "M") return check();

  }

  // Validate Phone number field
  checkFieldPhone() {
    const check = () => {
      this.bad_fields.phone = true;
    };

    // Input must all be numbers, and must be under 12 digits
    if (isNaN(+this.user.user_profile_info.phone)) return check();
  }
  //#endregion Field Validation

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

  async onSubmit() {
    // check which fields the user doesn't want to include, and delete them
    this.checkDisabledFields();

    // do the update
    await this.userService.updateUserInfo(this.user);

    // then reload page
    document.location.reload();
  }
}
