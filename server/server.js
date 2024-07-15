require('dotenv').config();
const pool = require('./db');
const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.SERVER_PORT || 3001;
const host = process.env.SERVER_HOST || 'localhost';

app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.use(cors());
app.use(express.json());

// Nock route for testing database connection
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

app.post('/flight-data', (req, res) => {
  const searchData = { originPlace, destinationPlace, airline} = req.body;
  console.log(searchData);
  const flight_data = {
    price: '234.56',
    date: '2024-06-21',
    timestamp: new Date()
  };

  res.json(flight_data);
});

app.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
