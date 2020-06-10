import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { UserManagementService } from './user-management.service';
import { Product } from 'src/templates/product';

@Injectable({
  providedIn: 'root',
})
// NOTE: I know that this naming is retarded but I'm too lazy to deal with it
export class CartServiceService {
  options: {
    headers?: HttpHeaders | { [header: string]: string | string[] };
    observe?: 'body' | 'events' | 'response';
    params?: HttpParams | { [param: string]: string | string[] };
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
  };

  // ### Page Variables
  products: Product[]; // array to save items retrieved from backend
  API_URL: { ADD: string; REMOVE: string; GET_ALL: string };

  constructor(
    private http: HttpClient,
    private userService: UserManagementService
  ) {
    this.products = [] as Product[];
    this.API_URL = {
      ADD: '//localhost:3000/cart-add',
      REMOVE: '//localhost:3000/cart-remove',
      GET_ALL: '//localhost:3000/cart-get-all',
    };
  }

  // ### Add Product to cart
  addItem(product: Product) {
    return new Promise((resolve, reject) => {
      // TODO: test to see if this works

      const reqOptions = {
        observe: 'response' as const,
        responseType: 'json' as const,
      };

      const reqBody = {
        product: product,
      };

      this.http.post(this.API_URL.ADD, reqBody, reqOptions).subscribe(
        (response) => {
          resolve(response.status);
        },
        (errorResponse) => {
          reject(errorResponse.status);
        }
      );
    });
  }

  // ### Remove Product from cart
  removeItem(product: Product) {
    return new Promise((resolve, reject) => {
      // TODO: test to see if this works
      const reqOptions = {
        observe: 'response' as const,
        responseType: 'json' as const,
      };

      const reqBody = {
        product: product,
      };

      this.http.post(this.API_URL.ADD, reqBody, reqOptions).subscribe(
        (response) => {
          resolve(response.status);
        },
        (errorResponse) => {
          reject(errorResponse.status);
        }
      );
    });
  }

  // ### Get all items
  getAllItems() {
    // TODO: test to see if this works
    return new Promise((resolve, reject) => {
      const reqOptions = {
        observe: 'response' as const,
        responseType: 'json' as const,
      };

      const reqBody = {
        user: this.userService.user,
      };

      this.http.post(this.API_URL.GET_ALL, reqBody, reqOptions).subscribe(
        (response) => {
          console.log('Service Log: Received response from server');
          resolve(response.body['results']);
        },
        (errorResponse) => {
          reject(errorResponse.body['msg']);
        }
      );
    });
  }
}
