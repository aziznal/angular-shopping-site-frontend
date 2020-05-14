import { Injectable } from '@angular/core';

// typical service imports
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductManagementService {
  endpoint = '//localhost:3000'; // url of Backend API

  test_headers = {

  }

  constructor(private http: HttpClient) {}

  options: {
    headers?: HttpHeaders | { [header: string]: string | string[] };
    observe?: 'body' | 'events' | 'response';
    params?: HttpParams | { [param: string]: string | string[] };
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
  };

  getTest(): Observable<any> {
    // IMPORTANT: options can make or break the response handler
    const options = {
      observe: 'body' as const,
      responseType: 'text' as const,
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = this.http.get(this.endpoint + '/test', options);

    return res;
  }

  // POST Handler
  postTest() {

    const options = {
      observe: 'body' as const,
      responseType: 'text' as const,
    };

    const res = this.http.post( this.endpoint + '/test', { "hello": "there" }, options);

    return res;
  }

  // PUT Handler
  putTest() {
    const options = {
      observe: 'body' as const,
      responseType: 'text' as const,
    };

    const res = this.http.put( this.endpoint + "/test", { "hello": "again" }, options);

    return res;

  }

  // DELETE Handler
  deleteTest() {
    const options = {
      observe: 'body' as const,
      responseType: 'text' as const,
    };

    const res = this.http.delete(this.endpoint + "/test", options);

    return res;

  }

}
