import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserManagementService } from './user-management.service';
import { ProductManagementService } from './product-management.service';
import { cartItem } from 'src/templates/cartItem';

@Injectable({
  providedIn: 'root',
})
// TODO: change service name to something not completely idiotic
export class CartServiceService {
  // ### Page Variables
  private BASE_API_URL: string;
  private API_URL: {} | any;
  private cartItemsIdList: string[];
  loadedCartItems: cartItem[];

  constructor(
    private http: HttpClient,
    private userService: UserManagementService,
    private productService: ProductManagementService
  ) {
    this.BASE_API_URL = '//localhost:3000/';
    this.API_URL = {
      UPDATE: this.BASE_API_URL + 'cart-update',
    };

    this.cartItemsIdList = this.userService.user.cart;
    this.loadedCartItems = [];
  }

  private handleServerResponse(response) {-
    console.log(response.body['msg']);
  }

  private handleServerErrorResponse(errorResponse) {
    console.log('Received Error Response while updating user cart');
    console.log(errorResponse.body['msg']);
  }

  private sendCartUpdateRequest() {
    return new Promise((resolve, reject) => {
      const reqOptions = {
        observe: 'response' as const,
        responseType: 'json' as const,
      };

      const _query = { user: this.userService.user };

      this.http.post(this.API_URL.UPDATE, _query, reqOptions).subscribe(
        (response) => {
          this.handleServerResponse(response);

          resolve();
        },
        (errorResponse) => {

          this.handleServerErrorResponse(errorResponse);

          resolve();
        }
      );
    });
  }

  addItem(product_id: string, amount: number) {
    return new Promise(async (resolve, reject) => {
      // Check if user has a cart (first time using cart)
      if (!this.userService.user.cart) {
        this.userService.user.cart = [];
      }

      // Push product id onto the cart
      for (let i = 0; i < amount; i++) {
        this.userService.user.cart.push(product_id);
      }

      await this.sendCartUpdateRequest();
      resolve();
    });
  }

  removeItem(product_id: string) {
    return new Promise(async (resolve, reject) => {
      // NOTE: starting search from last keeps the items in same order
      // Search for LAST instance of given id and remove it from array
      for (let i = this.cartItemsIdList.length - 1; i >= 0; i--) {
        if (this.cartItemsIdList[i] == product_id) {
          this.cartItemsIdList.splice(i, 1);
          break;
        }
      }

      // Send update request to backend
      await this.sendCartUpdateRequest();
      resolve();
    });
  }

  // ### Remove All
  removeAllItems() {
    return new Promise(async (resolve, reject) => {
      // Reset user cart to an empty array
      this.userService.user.cart = [];

      // Send update request to backend
      await this.sendCartUpdateRequest();
      resolve();
    });
  }

  // ### Load All Helper
  private itemIsAlreadyLoaded(id: string): boolean {
    // Traverese all items to see one matches given id
    for (let item of this.loadedCartItems) {
      if (item.product._id == id) {
        item.amount++;
        return true;
      }
    }

    // If none match, then
    return false;
  }

  private loadProductToCart(response){
    const formatted_item = {
      product: response.body['results'],
      amount: 1,
    };

    this.loadedCartItems.push(formatted_item);
  }

  async loadAllCartItems() {
    return new Promise(async (resolve, reject) => {
      // reset loaded_cart every time this method is called
      this.loadedCartItems = [];

      for (let item_id of this.cartItemsIdList){

        if (this.itemIsAlreadyLoaded(item_id)) continue;

        const _query = { _id: item_id };
        await this.productService.simpleProductQuery(_query, true, (response) => {
          this.loadProductToCart(response);
        })

      }

      resolve();

    });
  }
}
