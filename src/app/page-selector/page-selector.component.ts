import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page-selector',
  templateUrl: './page-selector.component.html',
  styleUrls: ['./page-selector.component.css'],
})
export class PageSelectorComponent implements OnInit {

  // Event Emitter to tell parent to update page data
  @Output() updateData = new EventEmitter<any>();

  // Page Variables
  @ViewChild('nextButton', { read: ElementRef }) nextButton: ElementRef<any>;
  @ViewChild('prevButton', { read: ElementRef }) prevButton: ElementRef<any>;
  @ViewChild('goButton', { read: ElementRef }) goButton: ElementRef<any>;

  page_params;
  page_number: string;
  private _total_page_number: number;

  @Input()
  set total_page_number(total_page_number: number) {
    this._total_page_number = total_page_number;

    // Update Next Button
    this.enableNext = +this.page_number < this._total_page_number;
  };

  get total_page_number(): number {
    return this._total_page_number;
  };

  // for enabling and disabling prev. page and next page buttons
  enablePrevious: boolean;
  enableNext: boolean;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.page_params = {};
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {

      // get starting page params to add to the url again later
      Object.keys(params).map((key, _) => {
        this.page_params[key] = params[key];
      });

      // if no page param was given, go to page 0 by default
      if (!params.page) {
        this.page_params.page = '0';
        this.router
          .navigate([this.router.url.split('?')[0]], {
            queryParams: this.page_params,
          })
          .then(() => {
            document.location.reload();
          });
      }

      // to keep track of current page
      if (params.page) this.page_number = params.page; // then see if actually provided

      this.enablePrevious = +this.page_number > 0;
      this.enableNext = +this.page_number < this._total_page_number;
    });

  }

  onPageChange() {
    this.updateData.emit();
  }

  // ### Change Page
  async changePage() {
    await new Promise((resolve, reject) => {
      const base_route = this.router.url.split('?')[0];

      // for negative inputs, do nothing.
      if (+this.page_number < 0) return;

      this.page_params.page = this.page_number;

      this.router.navigate([base_route], { queryParams: this.page_params })
      .then(() => { window.scrollTo(0, 0) }); // scroll to top

      // Disable all three buttons for 1.5 seconds after any of them is clicked
      this.nextButton.nativeElement.disabled = true;
      this.prevButton.nativeElement.disabled = true;
      this.goButton.nativeElement.disabled  = true;

      setTimeout(() => {
        this.nextButton.nativeElement.disabled = false;
        this.prevButton.nativeElement.disabled = false;
        this.goButton.nativeElement.disabled  = false;
      }, 1500);

      resolve();
    })

    // Send Event to parent
    this.onPageChange();
  }

  // ### Previous Page Button
  previousPage() {

    if (+this.page_number < 0) {
      this.page_number = '0';
      this.changePage();
    } else {

      this.page_number = +this.page_number - 1 + '';
      this.changePage();
    }

  }

  // ### Next Page Button
  nextPage() {

    // if a negative number was entered in input, reset to 0
    if (+this.page_number < 0) {
      this.page_number = '0';
      this.changePage();
    } else {

      this.page_number = +this.page_number + 1 + '';
      this.changePage();
    }
  }
}
