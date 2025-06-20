import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeminiWebsocket implements OnDestroy{
private ws!: WebSocket;
  private tradeSubject = new Subject<any>();

  connect(symbol: string): Observable<any> {
    this.ws = new WebSocket(`ws://localhost:3000/ws/marketdata/${symbol}?top_of_book=true`);

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'trade') {
        // Emitimos solo los mensajes de tipo "trade"
        this.tradeSubject.next(data);
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.ws.onclose = () => {
      console.warn('WebSocket cerrado');
    };

    return this.tradeSubject.asObservable();
  }

  close(): void {
    if (this.ws) {
      this.ws.close();
    }
  }

  ngOnDestroy(): void {
    this.close();
  }
}
