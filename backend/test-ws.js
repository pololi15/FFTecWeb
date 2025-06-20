const WebSocket = require('ws');

const symbol = 'btcusd';
const ws = new WebSocket(`wss://api.gemini.com/v1/marketdata/${symbol}?top_of_book=true`);

ws.on('open', () => {
  console.log('WebSocket abierto con Gemini');
});

ws.on('message', (data) => {
  console.log('Mensaje recibido:', data.toString());
});

ws.on('close', () => {
  console.log('WebSocket cerrado por Gemini');
});

ws.on('error', (err) => {
  console.error('Error en WebSocket:', err);
}); 