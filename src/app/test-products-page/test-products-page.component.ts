import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductManagementService } from '../product-management.service';

import { search_filters } from './search-filters';
import { Product } from 'src/templates/product';

@Component({
  selector: 'app-test-products-page',
  templateUrl: './test-products-page.component.html',
  styleUrls: ['./test-products-page.component.css'],
})
export class TestProductsPageComponent implements OnInit {
  // Page Variables
  products: Product[];
  search_filters: string[];

  page_number: number;
  category: string;
  sort_by: string;

  // Getting Sort Button Element
  @ViewChild('sortButton', { read: ElementRef }) sort_button: ElementRef<any>;

  constructor(
    private productService: ProductManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.products = [] as Product[];
    this.page_number = 0;
    this.category = '';
    this.search_filters = search_filters;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.page_number = params.page;
      this.sort_by = params.sort_by;
    });

    this.route.params.subscribe((params) => {
      this.category = params.category;
    });

    this.loadData();
  }

  // Loads all products from backend
  loadData() {
    this.productService.advancedProductQuery(
      this.page_number,
      { category: this.category },
      this.sort_by,
      (response) => {
        if (response.status == 404) console.log('404 No Products were found!');

        this.products = response.body['results'];
      }
    );
  }

  // Sort Button
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

    // adjust url to persist settings even after changing to next page
    this.router.navigate([this.router.url.split('?')[0]], {
      queryParams: query_params,
    });

    // reload data to visualize sort
    this.loadData();
  }

  // REFACTOR: put script into its own file
  //#region Rating Stars

  generateStarsCapacity(difference: number) {
    const percentage = difference * 100;

    /*
    note: no need for double sided comparison (prev_num < target < next_num)
    because 'return' stops the method from progressing either way
    */

    if (percentage >= 75) {
      return 'three-quarters';
    }

    if (percentage >= 50) {
      return 'half';
    }

    if (percentage > 0) {
      return 'quarter';
    }

    // if all above fails, then percentage == 0
    return 'empty';
  }

  generateStarsPath(stars: string[]) {
    stars.map((val, key) => {
      stars[key] = '../../assets/rating-star/' + val + '.png';
    });
  }

  // Star Generator Method
  generateStars(rating: number) {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      // All stars start out empty
      stars[i] = 'empty';

      if (rating >= i) {
        // Full star + potential overflow to next star
        if (rating - i >= 1) {
          stars[i] = 'full';
          continue;
        }

        // Fraction of a star
        else if (rating - i < 1 || rating != i) {
          stars[i] = this.generateStarsCapacity(rating - i);
          continue;
        }
      }
    }

    this.generateStarsPath(stars);
    return stars;
  }

  //#endregion Rating Stars
}
