import { Component, OnInit } from '@angular/core';
import { Gemini } from '../../services/gemini';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [CommonModule,RouterModule, HttpClientModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit{
  cryptos: string[] = [];
  loading: boolean = true;


  constructor(private geminiService: Gemini) {}

  ngOnInit(): void {
    this.geminiService.getCryptos().subscribe({
      next: (data) => {
        this.cryptos = data.slice(0, 10); // Mostrar las 10 primeras criptos
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener criptomonedas:', err);
        this.loading = false;
      }
    });
  }
}
