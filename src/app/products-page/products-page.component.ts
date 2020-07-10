import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductManagementService } from '../product-management.service';

import { search_filters } from './search-filters';
import { Product } from 'src/templates/product';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  // ### Page Variables
  @ViewChild('sortButton', { read: ElementRef }) sort_button: ElementRef<any>;

  currentLoadedProducts: Product[];

  productSearchFilters: string[];
  currentSearchFilter: string;

  currentPageNumber: number;
  totalPagesAmount: number;

  currentProductCategory: string;

  subscriptions: Subscription[];

  constructor(
    private productService: ProductManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentLoadedProducts = [] as Product[];
    this.currentPageNumber = 0;
    this.totalPagesAmount = 0;
    this.currentProductCategory = '';
    this.productSearchFilters = search_filters;

    this.subscriptions = [] as Subscription[];
  }

  ngOnInit(): void {
    this.initPage();
  }

  private unsubscribeFromAllObservables(){
    this.subscriptions.forEach(observable => {
      observable.unsubscribe();
    });
  }

  ngOnDestroy(){
    this.unsubscribeFromAllObservables();
  }

  private queueForUnsubscription(observable: Subscription){
    this.subscriptions.push(observable);
  }

  private getPageQueryParams() {
    return new Promise((resolve, reject) => {

      let queryParams = this.route.queryParams;

      let observable = queryParams.subscribe((params) => {
        this.currentPageNumber = params.page;
        this.currentSearchFilter = params.sort_by;

        resolve();

      });

      this.queueForUnsubscription(observable);

    });
  }

  private getPageParams() {
    return new Promise((resolve, reject) => {

      let params = this.route.params;

      let observable = params.subscribe((params) => {
        this.currentProductCategory = params.category;

        resolve();
      });

      this.queueForUnsubscription(observable);

    });
  }

  private loadProductData() {
    const _query = { category: this.currentProductCategory };

    this.productService.advancedProductQuery(
      this.currentPageNumber,
      _query,
      this.currentSearchFilter,
      (response) => {
        this.handleServerResponse(response);
      }
    );
  }

  async initPage() {
    await this.getPageQueryParams(); // store /:param  type parameters
    await this.getPageParams(); // store &param=  type parameters

    this.loadProductData();
  }

  private handleServerResponse(response) {
    if (response.status == 404) console.log('404 No Products were found!');
    this.currentLoadedProducts = response.body['results'];
    this.totalPagesAmount = response.body['total_page_number'];
  }

  generateProductStars(product: Product) {
    return this.productService.generateStars(product.rating);
  }

  private disableSortButtonForGivenPeriod(given_period) {

    this.sort_button.nativeElement.disabled = true;

    setTimeout(() => {
      this.sort_button.nativeElement.disabled = false;
    }, given_period);
  }

  private setNewUrlParameters() {
    // set new url parameters
    let query_params = {
      page: this.currentPageNumber,
    };

    this.checkSortMethod(query_params);

    return query_params;
  }

  private checkSortMethod(query_params) {
    if (
      this.currentSearchFilter !== null &&
      this.currentSearchFilter != 'none'
    ) {
      query_params['sort_by'] = this.currentSearchFilter;
    }
  }

  private navigateToNewPageUrl() {
    let urlParameters = this.setNewUrlParameters();

    const baseUrl = this.router.url.split('?')[0];

    // create new url with the new parameters
    this.router.navigate([baseUrl], { queryParams: urlParameters });
  }

  sortButtonOnclick() {
    // to prevent spam
    this.disableSortButtonForGivenPeriod(500);

    this.navigateToNewPageUrl();

    // reload data to visualize sort
    this.loadProductData();
  }

  // ### Event listener for page selector
  updatePageData() {
    // GLITCH: Multiple page data updates seem to be getting sent per child event emitted
    this.initPage();
  }
}
