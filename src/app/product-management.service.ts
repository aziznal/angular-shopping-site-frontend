import { Injectable } from '@angular/core';

// typical service imports
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Product } from 'src/templates/product';

@Injectable({
  providedIn: 'root',
})
export class ProductManagementService {
  // TODO: put the Product Star Generator script in here since it's only gonna be used with products

  // IDEA: define the each used API_URL in an object to make referencing them easier?

  API_URL: string; // url of Backend API

  constructor(private http: HttpClient) {
    this.API_URL = '//localhost:3000';
  }

  options: {
    headers?: HttpHeaders | { [header: string]: string | string[] };
    observe?: 'body' | 'events' | 'response';
    params?: HttpParams | { [param: string]: string | string[] };
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
  };

  // Method to convert necessary fields to a numerical value
  fixQueryValues(product: Product): void {
    const numericals = ['price', 'rating', 'sold'];
    Object.keys(product).map((key, _) => {
      if (numericals.includes(key)) {
        product[key] = parseFloat(product[key]);
      }
    });
  }

  //#region PRODUCT_FORM_QUERIES

  // TODO: refactor service response handling as backend is being refactored

  // Search Query
  getProduct(query, callback) {
    const getOptions = {
      observe: 'response' as const,
      responseType: 'json' as const,
    };

    this.http.post(this.API_URL + '/forms/get', query, getOptions).subscribe(
      (response) => {
        callback(response);
      },
      (err) => {
        callback(err);
      }
    );
  }

  // Product Create Request
  createProduct(product: Product, callback) {
    const postOptions = {
      observe: 'response' as const,
      responseType: 'json' as const,
    };

    // Convert numerical fields from <string> -> <number>
    this.fixQueryValues(product);

    this.http
      .post(this.API_URL + '/forms', product, postOptions)
      .subscribe((response) => {
        callback(response);
      });
  }

  // Product Update Request
  updateProduct(product: Product, callback) {
    const putOptions = {
      observe: 'response' as const,
      responseType: 'json' as const,
    };

    // Convert numerical fields from <string> -> <number>
    this.fixQueryValues(product);

    this.http.put(this.API_URL + '/forms', product, putOptions).subscribe(
      (response) => {
        callback(response);
      },
      (err) => {
        callback(err);
      }
    );
  }

  // Product Delete Request
  removeProduct(product: Product, callback) {
    const deleteOptions = {
      observe: 'response' as const,
      responseType: 'json' as const,
    };

    this.http
      .post(this.API_URL + '/forms/delete', product, deleteOptions)
      .subscribe(
        (response) => {
          callback(response);
        },
        (err) => {
          callback(err);
        }
      );
  }

  //#endregion PRODUCT_FORM_QUERIES

  // TODO: change function / method names
  //#region Product Queries

  // Simple Product Query
  simpleProductQuery(query, single_product: boolean, callback) {
    const options = {
      observe: 'response' as const,
      responseType: 'json' as const,
    };

    let url = this.API_URL;

    // backend expects this param when loading a single document
    if (single_product) {
      url += '?for_product_page=true';
    }

    this.http.post(url, query, options).subscribe(
      (response) => {
        callback(response);
      },
      (err) => {
        callback(err);
      }
    );
  }

  // Advanced Product Query
  /*
    Advanced Query is mainly used to load a page of products,
    or load products pre-ordered according to a certain criteria
  */
  advancedProductQuery(page_num, query, sort_by, callback: Function) {
    const reqOptions = {
      observe: 'response' as const,
      responseType: 'json' as const,
    };

    let url = this.API_URL + '/browse?page=' + page_num;

    // adding sort filters as a url parameter
    if (sort_by !== null) {
      url += '&sort_by=' + sort_by;
    }

    this.http.post(url, query, reqOptions).subscribe(
      (response) => {
        callback(response);
      },
      (err) => {
        callback(err);
      }
    );
  }

  //#endregion Product Queries
}
