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
  API_URL = '//localhost:3000'; // url of Backend API

  constructor(private http: HttpClient) {}

  options: {
    headers?: HttpHeaders | { [header: string]: string | string[] };
    observe?: 'body' | 'events' | 'response';
    params?: HttpParams | { [param: string]: string | string[] };
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
  };

  //#region Test Handlers
  getTest(): Observable<any> {
    // IMPORTANT: options can make or break the response handler
    const options = {
      observe: 'body' as const,
      responseType: 'text' as const,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = this.http.get(this.API_URL + '/test', options);

    return res;
  }

  // POST Handler
  postTest() {
    const options = {
      observe: 'body' as const,
      responseType: 'text' as const,
    };

    const res = this.http.post(
      this.API_URL + '/test',
      { hello: 'there' },
      options
    );

    return res;
  }

  // PUT Handler
  putTest() {
    const options = {
      observe: 'body' as const,
      responseType: 'text' as const,
    };

    const res = this.http.put(
      this.API_URL + '/test',
      { hello: 'again' },
      options
    );

    return res;
  }

  // DELETE Handler
  deleteTest() {
    const options = {
      observe: 'body' as const,
      responseType: 'text' as const,
    };

    const res = this.http.delete(this.API_URL + '/test', options);

    return res;
  }

  // Server Response Test
  serverResponseTest() {
    const options = {
      observe: 'response' as const,
      responseType: 'text' as const,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = this.http.post(
      this.API_URL + '/forms',
      { category: 'TEST', name: 'Message from Frontend' },
      options
    );

    return res;
  }

  //#endregion Test Handlers

  // Method to convert necessary fields to a numerical value
  fixQueryValues(product: Product): void{
    const numericals = ['price', 'rating', 'sold'];
    Object.keys(product).map((key, _) => {
      if (numericals.includes(key)){
        product[key] = parseFloat(product[key]);
      }
    });
  }

  //#region basic CRUD queries

  // Search Query
  getDocs(query, callback) {
    const getOptions = {
      observe: 'body' as const,
      responseType: 'json' as const,
      headers: {
        'Content-Type': 'application/json',
      },
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
      observe: 'body' as const,
      responseType: 'text' as const,
      headers: {
        'Content-Type': 'application/json',
      },
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
      observe: 'body' as const,
      responseType: 'text' as const,
      headers: {
        "Content-Type": "application/json"
      }
    }

    // Convert numerical fields from <string> -> <number>
    this.fixQueryValues(product);

    this.http.put(this.API_URL + "/forms", product, putOptions).subscribe(
      (response) => {
        callback(response);
      },
      (err) => {
        callback(err);
      }
    )
  }

  // Product Delete Request
  removeProduct(product: Product, callback) {
    const deleteOptions = {
      observe: 'body' as const,
      responseType: 'text' as const,
      headers: {
        "Content-Type": "application/json"
      },
    };

    this.http.post(this.API_URL + "/forms/delete", product, deleteOptions).subscribe(
      (response) => {
        callback(response);
      },
      (err) => {
        callback(err);
      }
    )

  }

  //#endregion basic CRUD queries

  //#region Product Queries

  // Simple Product Query
  simpleQuery(query, single_product:boolean, callback){
    const options = {
      observe: 'body' as const,
      responseType: 'json' as const,
      header: {
        'Content-Type': 'application/json'
      }
    };


    let url = this.API_URL;

    // backend expects this param when loading a single document
    if (single_product){
      url += '?for_product_page=true';
    };

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
  advancedGetDocs(page_num, query, sort_by, callback: Function){
    const getOptions = {
      observe: 'body' as const,
      responseType: 'json' as const,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let url = this.API_URL + '/browse?page=' + page_num;

    // adding sort filters as a url parameter
    if (sort_by !== null){
      url += "&sort_by=" + sort_by;

      console.log("current url: ");
      console.log(url);

    }

    this.http.post(url, query, getOptions).subscribe(
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
