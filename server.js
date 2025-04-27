import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Habilitar CORS para que cualquier frontend pueda conectarse
app.use(cors());

// Endpoint para devolver el precio actual de BTC/USDT
app.get('/api/price', async (req, res) => {
  try {
    const response = await axios.get('https://api-cloud.bitmart.com/spot/quotation/v3/ticker?symbol=BTC_USDT');
    const price = response.data.data.last;
    res.json({ price });
  } catch (error) {
    console.error('Error fetching price:', error.message);
    res.status(500).json({ error: 'Failed to fetch price' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});

// Cada 10 segundos consultar e imprimir el precio
setInterval(async () => {
  try {
    const response = await axios.get('https://api-cloud.bitmart.com/spot/quotation/v3/ticker?symbol=BTC_USDT');
    const price = response.data.data.last;
    console.log(`[${new Date().toLocaleTimeString()}] BTC/USDT: ${price}`);
  } catch (error) {
    console.error('Interval Error:', error.message);
  }
}, 10000); // cada 10 segundos





