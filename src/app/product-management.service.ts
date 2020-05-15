import { Injectable } from '@angular/core';

// typical service imports
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

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
        "Content-Type": "application/json"
      }
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

    const res = this.http.post( this.API_URL + '/test', { "hello": "there" }, options);

    return res;
  }

  // PUT Handler
  putTest() {
    const options = {
      observe: 'body' as const,
      responseType: 'text' as const,
    };

    const res = this.http.put( this.API_URL + "/test", { "hello": "again" }, options);

    return res;

  }

  // DELETE Handler
  deleteTest() {
    const options = {
      observe: 'body' as const,
      responseType: 'text' as const,
    };

    const res = this.http.delete(this.API_URL + "/test", options);

    return res;

  }

  // Server Response Test
  serverResponseTest() {

    const options = {
      observe: 'response' as const,
      responseType: 'text' as const,
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = this.http.post(this.API_URL + "/forms", {"category": "TEST", "name": "Message from Frontend"}, options);

    return res;

  }

  //#endregion Test Handlers



}
