import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Cryptos } from './pages/cryptos/cryptos';
import { CryptoDetails } from './pages/crypto-details/crypto-details';
import { Trades } from './pages/trades/trades';
import { About } from './pages/about/about';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'cryptos', component: Cryptos },
  { path: 'cryptos/:symbol', component: CryptoDetails },
  { path: 'trades', component: Trades },
  { path: 'about', component: About },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
