import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Gemini {
private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getTicker(symbol: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/ticker/${symbol}`);
  }

  getCryptos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/symbols`);
  }

  getTrades(symbol: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/trades/${symbol}`);
  }

getRecentTrades(symbol: string) {
  return this.http.get(`${this.baseUrl}/trades/${symbol}`);
}

}

