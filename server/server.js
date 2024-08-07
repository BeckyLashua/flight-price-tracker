require('dotenv').config();
const pool = require('./db');
const express = require('express');
const app = express();
const cors = require('cors');
const { fetchLowestPrices } = require('./fetchLowestPrices');


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
  const { startDate, endDate, origin, destination, airline} = req.body;
  const data = { startDate, endDate, origin, destination, airline };
  try {
    const lowestPriceEntries = await fetchLowestPrices(data);
    //console.log('Entries with the lowest price: ', lowestPriceEntries);
    res.json(lowestPriceEntries);
  } catch(error) {
    console.error('Error:', error); 
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});