import { Injectable } from '@angular/core';

// typical service imports
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Product } from 'src/templates/product';

@Injectable({
  providedIn: 'root',
})
export class ProductManagementService {

  // IDEA: define each used API_URL in an object to make referencing them easier?

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

  //#region Product Queries

  // Simple Product Query
  simpleProductQuery(query, single_product: boolean, callback) {

    return new Promise ((resolve, reject) => {

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
          resolve();
        },
        (err) => {
          callback(err);
          resolve();
        }
      );

    });

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

  //#region Rating Stars Generator

  private generateStarCapacity(difference: number) {
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

  private generateStarsPath(stars: string[]) {
    /*
      After all stars have been correctly labeled, find their relevant images' path.
    */
    stars.map((val, key) => {
      stars[key] = '../../assets/rating-star/' + val + '.png';
    });
  }

  // Star Generator Method
  generateStars(rating: number) {
    // Returns a list of paths to load correctly labeled stars

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
          stars[i] = this.generateStarCapacity(rating - i);
          continue;
        }
      }
    }

    this.generateStarsPath(stars);
    return stars;
  }

  //#endregion Rating Stars Generator

}
