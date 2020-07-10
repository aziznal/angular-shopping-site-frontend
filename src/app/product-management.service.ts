import { Injectable } from '@angular/core';

// typical service imports
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Product } from 'src/templates/product';

@Injectable({
  providedIn: 'root',
})
export class ProductManagementService {
  BASE_API_URL: string; // url of Backend API
  API_URL: {} | any;

  constructor(private http: HttpClient) {
    this.BASE_API_URL = '//localhost:3000';

    this.API_URL = {
      base: '//localhost:3000',
      GET: this.BASE_API_URL + '/forms/get',
      CREATE_OR_UPDATE: this.BASE_API_URL + '/forms',
      DELETE: this.BASE_API_URL + '/forms/delete',
    };
  }

  options: {
    headers?: HttpHeaders | { [header: string]: string | string[] };
    observe?: 'body' | 'events' | 'response';
    params?: HttpParams | { [param: string]: string | string[] };
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
  };

  convertNumericalFieldsToFloat(product: Product): void {
    const numericalFields = ['price', 'rating', 'sold'];
    Object.keys(product).map((key, _) => {
      if (numericalFields.includes(key)) {
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

    this.http.post(this.API_URL.GET, query, getOptions).subscribe(
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
    this.convertNumericalFieldsToFloat(product);

    this.http
      .post(this.API_URL.CREATE_OR_UPDATE, product, postOptions)
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
    this.convertNumericalFieldsToFloat(product);

    this.http.put(this.API_URL.CREATE_OR_UPDATE, product, putOptions).subscribe(
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

    this.http.post(this.API_URL.DELETE, product, deleteOptions).subscribe(
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

  simpleProductQuery(query, single_product: boolean, callback) {
    return new Promise((resolve, reject) => {
      const options = {
        observe: 'response' as const,
        responseType: 'json' as const,
      };

      let url = this.BASE_API_URL;

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

  advancedProductQuery(page_num, query, sort_by, callback: Function) {
    // used to load a page of products, which can be filtered or sorted
    const reqOptions = {
      observe: 'response' as const,
      responseType: 'json' as const,
    };

    let url = this.BASE_API_URL + '/browse?page=' + page_num;

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

  private generateStarLabel(difference: number) {
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

    // percentage == 0
    return 'empty';
  }

  private generateAssetPaths(stars: string[]) {
    /*
      After all stars have been correctly labeled, find their relevant images' path.
    */
    stars.map((val, key) => {
      stars[key] = '../../assets/rating-star/' + val + '.png';
    });
  }

  generateStars(rating: number) {
    // Returns a list of paths of star images chosen according to rating

    const stars = [];

    for (let i = 0; i < 5; i++) {
      // All stars start out empty
      stars[i] = 'empty';

      if (rating >= i) {
        // Case: Full star
        if (rating - i >= 1) {
          stars[i] = 'full';
          continue;
        }

        // Case: Fraction of a star ( or empty star)
        else if (rating - i < 1 || rating != i) {
          stars[i] = this.generateStarLabel(rating - i);
          continue;
        }
      }
    }

    this.generateAssetPaths(stars);
    return stars;
  }

  //#endregion Rating Stars Generator
}
