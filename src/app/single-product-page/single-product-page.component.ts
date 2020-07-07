import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductManagementService } from '../product-management.service';
import { CartServiceService } from '../cart-service.service';
import { UserManagementService } from '../user-management.service';

import { Product } from '../../templates/product';

@Component({
  selector: 'app-single-product-page',
  templateUrl: './single-product-page.component.html',
  styleUrls: ['./single-product-page.component.css'],
})
export class SingleProductPageComponent implements OnInit {
  // ### Page Variables
  @Output() newItemCounter = new EventEmitter<string>(); // Sends a message to app.component
  product: Product;
  product_amount: number;

  freak_out: false;
  freak_out_interval;

  message: string;
  productFound: boolean;
  userSignedIn: boolean;

  constructor(
    private productService: ProductManagementService,
    private userCart: CartServiceService,
    private userService: UserManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.product = {} as Product;
    this.product_amount = 1;
    this.productFound = true;

  }

  ngOnInit(): void {
    // get id from url
    this.message = JSON.stringify(this.route.params, null, 2);
    this.route.params.subscribe((params) => {
      this.product._id = params._id;
    });

    // then load data from backend
    this.productService.simpleProductQuery(this.product, true, (response) => {
      if (response.status == 404) {
        this.productFound = false;
        return;
      }

      if (response.status == 400) {
        console.log(response.body['mgs']);
        this.productFound = false;
        return;
      }

      this.product = response.body['results'];
      this.productFound = true;
    });
  }

  // ### Add to Cart Button
  async addToCart() {

    // TODO: pass in current url to redirect to after user has logged in
    if (!this.userService.userIsLoggedIn){
      this.router.navigate(['login']);
      return;
    }

    // To avoid adding a negative amount of product
    if (this.freak_out) return;

    await this.userCart.add(this.product._id, this.product_amount);

    this.showAddedItemToCart();
  }

  // ### Notify user that item has been added to cart
  showAddedItemToCart() {
    // TODO: show notification when an item is added to the cart
    console.log('Item Added to cart');
  }

  // ### A little joke for when users decrease the product amount to 0
  freakOut(){
      this.product_amount = 255;
      this.freak_out_interval = setInterval(_ => { this.product_amount--; }, 1);

      setTimeout(_ => { clearInterval(this.freak_out_interval); this.product_amount = 1;}, 5000);

  }

  // ### increase button handler
  incProductAmount(){
    if (this.product_amount < 99){
      this.product_amount++;
    } else {
      alert("Warning. Maximum item amount exceeded.");
    }
  }

  // ### Decrease button handler
  decProductAmount(){
    if (this.product_amount > 1){
      this.product_amount--;
    } else {
      this.freakOut();
    }
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
