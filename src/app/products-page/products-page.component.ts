import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductManagementService } from '../product-management.service';

import { search_filters } from './search-filters';
import { Product } from 'src/templates/product';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit {
  // ### Page Variables
  products: Product[];
  search_filters: string[];

  page_number: number;
  total_page_number: number;
  category: string;
  sort_by: string;

  // ### Getting Sort Button Element
  @ViewChild('sortButton', { read: ElementRef }) sort_button: ElementRef<any>;

  constructor(
    private productService: ProductManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.products = [] as Product[];
    this.page_number = 0;
    this.total_page_number = 0;
    this.category = '';
    this.search_filters = search_filters;
  }

  // ### ngOnInit
  ngOnInit(): void {
    this.initPage();
  }

  // ### init / refresh page variables and load product data
  initPage() {
    this.route.queryParams.subscribe((params) => {
      this.page_number = params.page;
      this.sort_by = params.sort_by;
    });

    this.route.params.subscribe((params) => {
      this.category = params.category;
    });

    this.loadData();
  }

  // ### Loads all products from backend
  loadData() {
    const _query = { category: this.category };
    this.productService.advancedProductQuery(this.page_number, _query, this.sort_by, (response) => {
        if (response.status == 404) console.log('404 No Products were found!');
        this.products = response.body['results'];
        this.total_page_number = response.body['total_page_number'];
      }
    );
  }

  // ### Generate stars for each product
  generateStars(product: Product){
    // Each product calls this method to generate stars according to its rating
    return this.productService.generateStars(product.rating);

  }

  // ### Sort Button Event Handler
  sortButtonOnclick() {
    this.sort_button.nativeElement.disabled = true;

    // Button is disabled for two seconds after click to prevent spam
    setTimeout(() => {
      this.sort_button.nativeElement.disabled = false;
    }, 2000);

    // setting url parameters for page change
    const query_params = {
      page: this.page_number,
    };

    if (this.sort_by !== null && this.sort_by != 'none') {
      query_params['sort_by'] = this.sort_by;
    }

    // adjust url to keep settings after changing to another page
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: query_params,
    });

    // reload data to visualize sort
    this.loadData();
  }

  // ### Event listener for page selector
  updatePageData() {
    // GLITCH: Multiple page data updates seem to be getting sent per child event emitted
    this.initPage();
  }

}
