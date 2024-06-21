const express = require('express');
const app = express();
const cors = require('cors');

const port = 3001;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/flight-data', (req, res) => {
  const flight_data = {
    message: 'Hello from the server!',
    timestamp: new Date()
  };

  res.json(flight_data);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
