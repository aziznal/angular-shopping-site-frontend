import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartServiceService } from '../cart-service.service';
import { UserManagementService } from '../user-management.service';
import { cartItem } from '../../templates/cartItem';

@Component({
  selector: 'app-cart-checkout-page',
  templateUrl: './cart-checkout-page.component.html',
  styleUrls: ['./cart-checkout-page.component.css'],
})
export class CartCheckoutPageComponent implements OnInit {
  // ### Page Variables
  cartEmpty: boolean;
  cartItems: cartItem[]; // Holds all loaded items
  itemsTotalPrice: number;  // To show in sidebar

  constructor(
    private cartService: CartServiceService,
    private userService: UserManagementService,
    private router: Router
  ) {
    // Redirect user to login page if not logged in
    if (!this.userService.userIsLoggedIn) {
      this.router.navigate(['login']);
    }

    this.cartEmpty = false;
    this.cartItems = [];
    this.itemsTotalPrice = 0;
  }

  ngOnInit(): void {

    this.loadProducts();

  }

  // ### Load all cart items
  async loadProducts() {
    // Check whether user has ever used their cart before
    let checkCart = this.userService.user.cart ? true : false;

    if (!checkCart) {
      return (this.cartEmpty = true);
    }

    // If all tests passed
    await this.cartService.loadAll();
    this.cartItems = this.cartService.loaded_cart;

    // Finally, check if cart is empty
    if (this.cartItems.length == 0) this.cartEmpty = true;

    this.calculateTotalPrice();

  }

  // ### Calculate Total Item Price
  calculateTotalPrice(){

    // Always init to ZERO
    this.itemsTotalPrice = 0;

    for (let item of this.cartItems){
      this.itemsTotalPrice += item.product.price * item.amount;
    }

  }

  // BUG: item order gets shifted when the user increases or decreases an item's amount
  // ### Increase item amount button
  async increaseCart(item: cartItem) {
    // increase number on display
    item.amount++;

    // Add item to cart
    await this.cartService.add(item.product._id);

    // Reload cart items
    this.loadProducts();
  }

  // ### Decrease item amount button
  async decreaseCart(item: cartItem) {
    if (item.amount == 1) {
      const confirmation = confirm('This will remove this item from the cart');

      if (!confirmation) return;
      item.amount--;
    } else if (item.amount > 1) {
      item.amount--;
    }

    // Remove an instance of the item from the cart
    this.cartService.remove(item.product._id);

    // Reload cart items
    this.loadProducts();
  }

  // ### clear cart from all items BUTTON
  clearCart() {
    const userConfirmaion = confirm(
      'This will remove all your items from the cart'
    );

    if (!userConfirmaion) return;

    this.cartService.removeAll();

    // refresh items after clearing
    this.cartEmpty = true;
    this.cartItems = [];
    this.calculateTotalPrice();

  }
}
