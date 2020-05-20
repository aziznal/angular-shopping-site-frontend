import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-selector',
  templateUrl: './page-selector.component.html',
  styleUrls: ['./page-selector.component.css'],
})
export class PageSelectorComponent implements OnInit {
  // TODO: show max amount of pages for current category
  constructor(private route: ActivatedRoute, private router: Router) {
    this.page_params = {};
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {

      console.log(JSON.stringify(params, null, 2));

      // get starting page params to add to the url again later
      Object.keys(params).map((key, _) => {
        this.page_params[key] = params[key];
      });

      // if no page param was given, go to page 0 by default
      if (!params.page){
        console.log("Setting page params...");
        this.page_params.page = "0";
        this.router.navigate([this.router.url.split('?')[0]], { queryParams: this.page_params }).then(() => {
          document.location.reload();
        })
      }

      // to keep track of current page
      if (params.page) this.page_number = params.page;  // then see if actually provided

      this.enablePrevious = +this.page_number > 0;
      this.enableNext = true;

    });
  }

  // Page Variables
  page_params;
  page_number: string;

  // for enabling and disabling prev. page and next page buttons
  enablePrevious: boolean;
  enableNext: boolean;

  // Change Page
  changePage() {
    const base_route = this.router.url.split('?')[0];

    // for negative inputs, do nothing.
    if (+this.page_number < 0) return;

    this.page_params.page = this.page_number;

    this.router.navigate([base_route], {queryParams: this.page_params}).then(() => {
      window.scrollTo(0, 0);
      document.location.reload();
    });
  }

  previousPage() {

    if(+this.page_number < 0){
      this.page_number = "0";
      this.changePage();
    }

    this.page_number = (+this.page_number - 1) + "";
    this.changePage();
  }

  nextPage() {

    // if a negative number was entered in input, reset to 0
    if(+this.page_number < 0) {
      this.page_number = "0";
      this.changePage();
    }

    this.page_number = (+this.page_number + 1) + "";
    this.changePage();
  }

}
