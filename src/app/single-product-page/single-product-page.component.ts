import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductManagementService } from '../product-management.service';
import { Product } from '../../templates/product';

@Component({
  selector: 'app-single-product-page',
  templateUrl: './single-product-page.component.html',
  styleUrls: ['./single-product-page.component.css'],
})
export class SingleProductPageComponent implements OnInit {
  // TODO: implement
  // page variables
  product: Product;
  message: string;
  productFound: boolean;

  constructor(
    private productService: ProductManagementService,
    private route: ActivatedRoute
  ) {
    this.product = {} as Product;
    this.productFound = true;
  }

  ngOnInit(): void {
    // get id from url
    this.message = JSON.stringify(this.route.params, null, 2);
    this.route.params.subscribe((params) => {
      this.product._id = params._id;
    });

    // then load data from backend
    this.productService.simpleQuery(this.product, true, (response) => {
      if (response.status == 404) {
        this.productFound = false;
        return;
      }

      if (response.status == 400) {
        // TODO: replace with response.body[msg]
        console.log('More than one product was found. Check Your Query!');
        this.productFound = false;
        return;
      }
      // TODO: replace with response.body['product'] or something (after service refactor)
      this.product = response;
      this.productFound = true;
    });
  }

  // TODO: refactor into own file / component
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
