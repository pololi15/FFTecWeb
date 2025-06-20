const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { createProxyServer } = require('http-proxy');
const http = require('http');

const app = express();
const PORT = 3000;

app.use(cors());

// Proxy para obtener trades de una cripto
app.get('/api/trades/:symbol', async (req, res) => {
  const { symbol } = req.params;
  try {
    const response = await axios.get(`https://api.gemini.com/v1/trades/${symbol}`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: 'Error al obtener trades de Gemini',
      error: error.message
    });
  }
});

// Proxy para obtener el ticker de una cripto
app.get('/api/ticker/:symbol', async (req, res) => {
  const { symbol } = req.params;
  try {
    const response = await axios.get(`https://api.gemini.com/v1/pubticker/${symbol}`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: 'Error al obtener ticker de Gemini',
      error: error.message
    });
  }
});

// Proxy para obtener la lista de criptos
app.get('/api/symbols', async (req, res) => {
  try {
    const response = await axios.get('https://api.gemini.com/v1/symbols');
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      message: 'Error al obtener símbolos de Gemini',
      error: error.message
    });
  }
});

const wsProxy = createProxyServer({
  target: 'wss://api.gemini.com',
  ws: true,
  changeOrigin: true,
  secure: true
});

wsProxy.on('error', (err, req, socket) => {
  console.error('WebSocket proxy error:', err);
  if (socket && socket.writable) {
    socket.end('HTTP/1.1 500 WebSocket Proxy Error\r\n');
  }
});

const server = http.createServer(app);

// Proxy WebSocket para marketdata
server.on('upgrade', (req, socket, head) => {
  if (req.url.startsWith('/ws/marketdata/')) {
    // Reescribe la URL para que coincida con la de Gemini
    req.url = req.url.replace('/ws', '/v1');
    wsProxy.ws(req, socket, head);
  }
});

server.listen(PORT, () => {
  console.log(`Proxy Gemini escuchando en http://localhost:${PORT}`);
  console.log(`WebSocket proxy activo en ws://localhost:${PORT}/ws/marketdata/:symbol?top_of_book=true`);
}); 