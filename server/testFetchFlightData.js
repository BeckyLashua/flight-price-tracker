require('dotenv').config();
const { insertFlightData } = require('./fetchFlightData');

const flightData = [
  {
    outbound_date: "2024-05-13T08:00:00",
    origin_airport_code: "BOS",
    destination_airport_code: "ORD",
    carrier_code: "AA",
    price: 200.0,
    currency: "USD",
    nonstop: true
  },
  {
    outbound_date: "2024-06-01T08:00:00",
    origin_airport_code: "BOS",
    destination_airport_code: "ORD",
    carrier_code: "WN",
    price: 100.0,
    currency: "USD",
    nonstop: true
  },
  {
    outbound_date: "2024-03-01T08:00:00",
    origin_airport_code: "BOS",
    destination_airport_code: "ORD",
    carrier_code: "AA",
    price: 274.0,
    currency: "USD",
    nonstop: true
  },
];

const testInsertFlightData = async () => {
  if (flightData) {
    await insertFlightData(flightData);
    console.log('Flight data inserted successfully.');
  } else {
    console.log('Failed to fetch flight data, so no data was inserted.');
  }
};

// Run tests
const runTests = async () => {
  await testInsertFlightData();
};

runTests();