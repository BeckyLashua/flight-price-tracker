require('dotenv').config();
const pool = require('./db');
const express = require('express');
const app = express();
const cors = require('cors');
const { fetchLowestPrice } = require('./fetchLowestPrice');

const port = process.env.SERVER_PORT || 3001;
const host = process.env.SERVER_HOST || 'localhost';

app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.use(cors());
app.use(express.json());

app.get('/testdb', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/flight-data', async (req, res) => {
  const searchData = { outboundDate, origin, destination, airline } = req.body;
  console.log(searchData);
  let flightData = {};
  try {
    const lowestEntry = await fetchLowestPrice(searchData);
    flightData = lowestEntry;
    console.log('Entry with the lowest price: ', lowestEntry);
  } catch(error) {
    console.error('Error:', error); 
  }

  res.json(flightData);
});

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
