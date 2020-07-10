import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-selector',
  templateUrl: './page-selector.component.html',
  styleUrls: ['./page-selector.component.css'],
})
export class PageSelectorComponent implements OnInit, OnDestroy {
  // Event Emitter to tell parent (products-page-component) to load new page data
  @Output() updateData = new EventEmitter<any>();

  // Page Variables
  @ViewChild('nextButton', { read: ElementRef }) nextButton: ElementRef<any>;
  @ViewChild('prevButton', { read: ElementRef }) prevButton: ElementRef<any>;
  @ViewChild('goButton', { read: ElementRef }) goButton: ElementRef<any>;

  storedPageParameters: {} | any;
  currentPageNumber: string;

  enablePreviousButton: boolean;
  enableNextButton: boolean;
  enableGoButton: boolean;

  private subscriptions: Subscription[];

  // set by parent (products-page-component)
  private __numberOfTotalPages: number;

  @Input()
  set numberOfTotalPages(totalPageNumber: number) {
    this.__numberOfTotalPages = totalPageNumber;

    // BUG: nextButton isn't being disabled using this condition
    this.setButtonsActiveOrInactive();
  }

  get numberOfTotalPages(): number {
    return this.__numberOfTotalPages;
  }

  constructor(private route: ActivatedRoute, private router: Router) {
    this.storedPageParameters = {};

    this.enableNextButton = false;
    this.enablePreviousButton = false;
    this.enableGoButton = true;

    this.subscriptions = [] as Subscription[];
  }

  private storeParamsObject(params) {
    Object.keys(params).map((key, _) => {
      this.storedPageParameters[key] = params[key];
    });
  }

  private goToPageZero() {
    this.storedPageParameters.page = '0';
    this.router
      .navigate([this.router.url.split('?')[0]], {
        queryParams: this.storedPageParameters,
      })
      .then(() => {
        document.location.reload();
      });
  }

  private storePageParameters() {
    return new Promise((resolve, reject) => {
      let queryParams = this.route.queryParams;

      let observable = queryParams.subscribe((params) => {
        // these will be loaded to new url when changing pages
        this.storeParamsObject(params);

        // if missing parameter
        if (!params.page) {
          this.goToPageZero();
        }

        this.currentPageNumber = params.page;
      });

      resolve();

      this.queueForUnsubscription(observable);
    });
  }

  ngOnInit(): void {
    this.storePageParameters();
    this.setButtonsActiveOrInactive();
  }

  private queueForUnsubscription(observable: Subscription) {
    this.subscriptions.push(observable);
  }

  private unsubscribeFromAllObservables() {
    this.subscriptions.forEach((observable) => {
      observable.unsubscribe();
    });
  }

  ngOnDestroy() {
    this.unsubscribeFromAllObservables();
  }

  private setButtonsActiveOrInactive() {
    // BUG: buttons aren't being disabled at lower / upper bounds
    // NOTE: to see the effects of this bug, start on page 0, press next, then press previous.
    // NOTE: Alternatively, start at last page, press previous, then press next.7

    this.enablePreviousButton = +this.currentPageNumber > 0;
    this.enableNextButton = +this.currentPageNumber < this.__numberOfTotalPages;
  }

  private notifyParentOfPageChange() {
    this.updateData.emit();
  }

  private goToNewPage() {
    const baseRoute = this.router.url.split('?')[0];

    this.storedPageParameters.page = this.currentPageNumber;

    this.router
      .navigate([baseRoute], { queryParams: this.storedPageParameters })
      .then(() => {
        window.scrollTo(0, 0);
      });
  }

  private disableAllButtonsForChosenPeriod(chosenPeriod: number) {
    this.enableNextButton = false;
    this.enablePreviousButton = false;
    this.enableGoButton = false;

    setTimeout(() => {
      this.enableNextButton = true;
      this.enablePreviousButton = true;
      this.enableGoButton = true;
    }, chosenPeriod);
  }

  async changePage() {
    await new Promise((resolve, reject) => {
      // do nothing for negative page numbers
      if (+this.currentPageNumber < 0) return;

      this.goToNewPage();

      // To prevent spam
      this.disableAllButtonsForChosenPeriod(500);

      resolve();
    });

    this.notifyParentOfPageChange();

    // BUG: this call nullifies the effects of disableAllButtonsForChosenPeriod
    this.setButtonsActiveOrInactive();
  }

  //#region Button Click Handlers
  goButtonOnClick() {
    this.changePage();
  }

  private goToPreviousPage(){
    if (+this.currentPageNumber < 0) {
      this.currentPageNumber = '0';
      this.changePage();
    } else {
      this.currentPageNumber = (+this.currentPageNumber - 1) + '';
      this.changePage();
    }
  }

  previousButtonOnClick() {
    this.goToPreviousPage();
  }

  private goToNextPage(){
    if (+this.currentPageNumber < 0) {
      this.currentPageNumber = '0';
      this.changePage();
    } else {
      this.currentPageNumber = (+this.currentPageNumber + 1) + '';
      this.changePage();
    }
  }

  nextButtonOnClick() {
    this.goToNextPage();
  }
  //#endregion
}
