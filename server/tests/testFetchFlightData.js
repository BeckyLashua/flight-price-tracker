//The testInsertFlightData function uses the existing generateFlights function to generate
//test data for the existing insertFlightData function to use to insert the generated data into the database.

require('dotenv').config();
const { insertFlightData } = require('../fetchFlightData');
const { generateFlights } = require('./generateFlights');

const testFlightData = generateFlights(10, '2023-06-01', '2024-06-01');
const flightData = [
  {
    outbound_date: "2024-07-15T08:00:00",
    origin_airport_code: "BOS",
    destination_airport_code: "ORD",
    carrier_code: "AA",
    price: 200.0,
    currency: "USD",
    nonstop: true
  },
  {
    outbound_date: "2024-07-15T08:00:00",
    origin_airport_code: "BOS",
    destination_airport_code: "ORD",
    carrier_code: "WN",
    price: 100.0,
    currency: "USD",
    nonstop: true
  },
  {
    outbound_date: "2024-07-15T08:00:00",
    origin_airport_code: "BOS",
    destination_airport_code: "ORD",
    carrier_code: "AA",
    price: 274.0,
    currency: "USD",
    nonstop: true
  },
];

const testInsertFlightData = async () => {
  if (testFlightData) {
    await insertFlightData(testFlightData);
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