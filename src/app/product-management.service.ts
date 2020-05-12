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

  constructor(private http: HttpClient) {}
  // IMPORTANT: last I was doing was trying to deal with the server's response

  options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body' | 'events' | 'response',
    params?: HttpParams|{[param: string]: string | string[]},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  }

  test(): Observable<any> {

    const options = {
      observe: 'body' as const,
      responseType: 'text' as const,
    }

    console.log('Executing Test...');
    const res = this.http.get(this.endpoint, options);

    return res;
  }
}
