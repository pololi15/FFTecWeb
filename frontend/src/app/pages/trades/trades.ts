import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeminiWebsocket } from '../../services/gemini-websocket';
import { CommonModule } from '@angular/common';
import { Gemini } from '../../services/gemini';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-trades',
  imports: [CommonModule,FormsModule, HttpClientModule],
  templateUrl: './trades.html',
  styleUrl: './trades.scss',
  animations: [
    trigger('highlight', [
      state('normal', style({ backgroundColor: 'white' })),
      state('highlighted', style({ backgroundColor: '#c8f7c5' })), // verde claro
      transition('highlighted => normal', [
        animate('0.8s')
      ])
    ])
  ]
})
export class Trades implements OnInit, OnDestroy{

  trades: any[] = [];
  tradeSubscription!: Subscription;

  symbol: string = 'btcusd';
  availableSymbols: string[] = [];
  loadingSymbols: boolean = true;

  constructor(
    private geminiWsService: GeminiWebsocket,
    private geminiService: Gemini
  ) {}

  ngOnInit(): void {
    this.loadSymbols();
    this.connectToWebSocket(this.symbol);
  }

  loadSymbols() {
    this.geminiService.getCryptos().subscribe({
      next: (symbols) => {
        this.availableSymbols = symbols;
                            // = symbols.slice(0, 20); // Mostramos las 20 primeras
        this.loadingSymbols = false;
      },
      error: (err) => {
        console.error('Error al cargar símbolos:', err);
        this.loadingSymbols = false;
      }
    });
  }

  
  highlightedTradeId: number | null = null;

  connectToWebSocket(symbol: string) {
    if (this.tradeSubscription) {
      this.tradeSubscription.unsubscribe();
    }
    this.trades = [];

    this.tradeSubscription = this.geminiWsService.connect(symbol).subscribe((data) => {
      if (data.events && data.events.length > 0) {
        const newTrade = data.events[0];
        this.trades.unshift(newTrade);
        this.highlightedTradeId = newTrade.tid; // ID único de trade

        if (this.trades.length > 20) {
          this.trades.pop();
        }

        // Quitar la animación después de 1 segundo
        setTimeout(() => {
          this.highlightedTradeId = null;
        }, 1000);
      }
    });
  }

  onSymbolChange(newSymbol: string) {
    this.symbol = newSymbol;
    this.geminiWsService.close();
    this.connectToWebSocket(this.symbol);
  }

  ngOnDestroy(): void {
    this.geminiWsService.close();
    if (this.tradeSubscription) {
      this.tradeSubscription.unsubscribe();
    }
  }
}
