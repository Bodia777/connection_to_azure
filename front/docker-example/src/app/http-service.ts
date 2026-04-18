import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiHttpClient {
  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  postToRedis(data: any): Observable<void> {
    const url = this.baseUrl + '/redis';
    return this.http.post<void>(url, {data});
  }

  getFromRedis(): Observable<string[]> {
    const url = this.baseUrl + '/redis';
    return this.http.get<string[]>(url);
  }

  postToDB(data: any): Observable<void> {
    const url = this.baseUrl + '/db';
    return this.http.post<void>(url, {data});
  }

  getFromDB(): Observable<string[]> {
    const url = this.baseUrl + '/db';
    return this.http.get<string[]>(url);
  }
}
