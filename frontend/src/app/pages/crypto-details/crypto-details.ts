import { Component, OnInit } from '@angular/core';
import { Gemini } from '../../services/gemini';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crypto-details',
  imports: [CommonModule],
  templateUrl: './crypto-details.html',
  styleUrl: './crypto-details.scss'
})
export class CryptoDetails implements OnInit{
  symbol: string = '';
  price: number = 0;
  trades: any[] = [];
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private geminiService: Gemini
  ) {}

  ngOnInit(): void {
    this.symbol = this.route.snapshot.paramMap.get('symbol') || '';

    // Obtener precio actual
    this.geminiService.getTicker(this.symbol).subscribe({
      next: (data) => {
        this.price = parseFloat(data.last);  //parseamos conviert el precio(el last) a número
      },
      error: (err) => console.error('Error al obtener precio:', err)
    });

    // Obtener últimos trades
    this.geminiService.getRecentTrades(this.symbol).subscribe({
      next: (data) => {
        this.trades = (data as any[]).slice(0, 30); // Mostramos últimos 30 trades
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener trades:', err);
        this.loading = false;
      }
    });
  }

  trackByTrade(index: number, trade: any): any {
  return trade.timestamp || index;
}//revisar si el trade tiene un timestamp único, si no, usar el índice como fallback
  //Es intereante,revisarlo mas a profundidad despues
}
