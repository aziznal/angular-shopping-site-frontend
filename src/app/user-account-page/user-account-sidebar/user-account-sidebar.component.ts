import { Component, OnInit } from '@angular/core';
import { links } from './links';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-account-sidebar',
  templateUrl: './user-account-sidebar.component.html',
  styleUrls: ['./user-account-sidebar.component.css']
})
export class UserAccountSidebarComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {

    // assign from imports
    this.links = links;

    this.highlightCurrentLink();

    this.loadPage = true;

  }

  // Page Variables

  // Array of link objects
  links;
  loadPage = false;

  // Highlight Current selected link
  highlightCurrentLink(){

    // find which link is to be highlighted
    const found_link = links.filter(link => link.url == this.router.url)[0];
    console.log("Found the following link");
    console.log(found_link);

    found_link.state = "active";

  }

  ngOnInit(): void {

  }

}
