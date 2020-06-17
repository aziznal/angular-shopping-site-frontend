import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserManagementService } from './user-management.service';
import { ProductManagementService } from './product-management.service';
import { cartItem } from 'src/templates/cartItem';

@Injectable({
  providedIn: 'root',
})
// NOTE: I know that this naming is retarded but I'm too lazy to deal with it
export class CartServiceService {
  // ### Page Variables
  private BASE_API_URL: string;
  private API_URL: {} | any;
  private id_cart: string[]; // While items are not loaded, this is an array of their ids
  loaded_cart: cartItem[]; // This will hold all the loaded items

  constructor(
    private http: HttpClient,
    private userService: UserManagementService,
    private productService: ProductManagementService
  ) {
    this.BASE_API_URL = '//localhost:3000/';
    this.API_URL = {
      UPDATE: this.BASE_API_URL + 'cart-update',
    };

    this.id_cart = this.userService.user.cart;
    this.loaded_cart = [];
  }

  // ### Send Update Requst (used in all below methods)
  updateRequest() {
    return new Promise((resolve, reject) => {
      const reqOptions = {
        observe: 'response' as const,
        responseType: 'json' as const,
      };

      // Send update request to backend
      this.http
        .post(this.API_URL.UPDATE, { user: this.userService.user }, reqOptions)
        .subscribe(
          (response) => {
            console.log(response.body['msg']);

            resolve();
          },
          (errorResponse) => {
            console.log('Received Error Response while updating user cart');
            console.log(errorResponse.body['msg']);

            resolve();
          }
        );
    });
  }

  // ### Add
  add(product_id: string) {
    return new Promise(async (resolve, reject) => {
      // Check if user has a cart (first time using cart)
      if (!this.userService.user.cart) {
        this.userService.user.cart = [];
      }

      // Push product id onto the cart
      this.userService.user.cart.push(product_id);

      await this.updateRequest();
      resolve();
    });
  }

  // ### Remove
  remove(product_id: string) {
    return new Promise(async (resolve, reject) => {
      // Search for first instance of given id and remove it from array
      for (let i = 0; i < this.id_cart.length; i++) {
        if (this.id_cart[i] == product_id) {
          this.id_cart.splice(i, 1);
          break;
        }
      }

      // Send update request to backend
      await this.updateRequest();
      resolve();
    });
  }

  // ### Remove All
  removeAll() {
    return new Promise(async (resolve, reject) => {
      // Reset user cart to an empty array
      this.userService.user.cart = [];

      // Send update request to backend
      await this.updateRequest();
      resolve();
    });
  }

  // ### Load All Helper
  private itemAlreadyLoaded(id: string): boolean {
    // Traverese all items to see one matches given id
    for (let item of this.loaded_cart) {
      if (item.product._id == id) {
        item.amount++;
        return true;
      }
    }

    // If none match, then
    return false;
  }

  // ### Loads full items (from their ids) in the user's cart
  async loadAll() {
    return new Promise(async (resolve, reject) => {
      // NOTE: reset loaded_cart every time this method is called
      this.loaded_cart = [];

      // Load each item from backend using the id array (cart)
      for (let i = 0; i < this.id_cart.length; i++) {
        // Check if current id has already been loaded
        const alreadyLoaded = this.itemAlreadyLoaded(this.id_cart[i]);
        if (alreadyLoaded) continue;

        // Send get_single_product request to backend to get this item
        const query = { _id: this.id_cart[i] };
        await this.productService.simpleProductQuery(
          query,
          true,
          (response) => {
            const formatted_item = {
              product: response.body['results'],
              amount: 1,
            };

            this.loaded_cart.push(formatted_item);
          }
        );
      }

      resolve();
    }); // End of Promise
  }
}
