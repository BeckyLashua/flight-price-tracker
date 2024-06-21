const express = require('express');
const app = express();
const cors = require('cors');

const port = 3001;

app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

app.use(cors());
app.use(express.json());

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
  console.log(`Server is running on http://localhost:${port}`);
});
