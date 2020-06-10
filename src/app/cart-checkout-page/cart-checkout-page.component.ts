import { Component, OnInit } from '@angular/core';

import { CartServiceService } from '../cart-service.service';
import { Product } from 'src/templates/product';

@Component({
  selector: 'app-cart-checkout-page',
  templateUrl: './cart-checkout-page.component.html',
  styleUrls: ['./cart-checkout-page.component.css'],
})
export class CartCheckoutPageComponent implements OnInit {
  // ### Page Variables
  cartEmpty: boolean;
  products: Product[] | any;

  constructor(private cartService: CartServiceService) {
    this.cartEmpty = false;
    this.products = [] as Product[];
  }

  // ### Load all cart items
  async loadProducts() {
    this.products = await this.cartService.getAllItems();
  }

  ngOnInit(): void {
    // TODO: add precondition for user to be logged in
  }
}
