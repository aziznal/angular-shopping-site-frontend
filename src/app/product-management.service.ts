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

  // BUG: numerical fields (price, rating, etc, are being posted to db as strings. again.)

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


  //#region Advanced Product Queries
  advancedGetDocs(page_num, query, callback){
    const getOptions = {
      observe: 'body' as const,
      responseType: 'json' as const,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const url = this.API_URL + '/browse?page=' + page_num;

    this.http.post(url, query, getOptions).subscribe(
      (response) => {
        callback(response);
      },
      (err) => {
        callback(err);
      }
    );
  }
  //#endregion Advanced Product Queries

}
