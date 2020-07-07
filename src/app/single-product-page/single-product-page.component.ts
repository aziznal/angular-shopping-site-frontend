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
  product_stars: string[];

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

      this.product_stars = this.productService.generateStars(this.product.rating);

    });
  }

  // ### Add to Cart Button
  async addToCart() {

    // TODO: pass url to redirect to after user sign-in
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

}
