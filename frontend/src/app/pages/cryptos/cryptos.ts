import { Component, OnInit } from '@angular/core';
import { Gemini } from '../../services/gemini';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cryptos',
  imports: [CommonModule,RouterLink, HttpClientModule],
  templateUrl: './cryptos.html',
  styleUrl: './cryptos.scss'
})
export class Cryptos implements OnInit{
  cryptos: { symbol: string, price: number }[] = [];
  loading: boolean = true;
  error: boolean = false;

  constructor(private geminiService: Gemini) {}

  ngOnInit(): void {
    this.geminiService.getCryptos().subscribe({
      next: (symbols) => {
        const selectedSymbols = symbols  //todas las criptomonedas
                                //= symbols.slice(0, 30); // 15 criptomonedas
        selectedSymbols.forEach((symbol: string) => {
          this.geminiService.getTicker(symbol).subscribe({
            next: (ticker) => {
              this.cryptos.push({ symbol, price: parseFloat(ticker.last) });
            },
            error: (err) => console.error('Error al obtener ticker:', err)
          });
        });

        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener criptomonedas:', err);
        this.loading = false;
        this.error = true;
      }
    });
  }

}
