import { Component, OnInit } from '@angular/core';
import { links } from './links';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-account-sidebar',
  templateUrl: './user-account-sidebar.component.html',
  styleUrls: ['./user-account-sidebar.component.css'],
})
export class UserAccountSidebarComponent implements OnInit {
  // Page Variables
  sidebarLinks: typeof links;
  pageCanLoad = false;

  constructor(private router: Router) {
    this.sidebarLinks = links;
    this.highlightCurrentLink();
    this.pageCanLoad = true;
  }

  // highlight the first link with an attribute that matches the url
  private highlightCurrentLink() {
    this.sidebarLinks = links;

    const found_link = links.filter((link) => link.url == this.router.url)[0];
    found_link.state = 'active';
  }

  resetAllLinkStates() {
    this.sidebarLinks.map((link) => {
      link.state = 'inactive';
    });
  }

  ngOnInit(): void {}
}
