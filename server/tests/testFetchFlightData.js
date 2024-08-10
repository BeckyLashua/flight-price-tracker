//The testInsertFlightData function uses the existing generateFlights function to generate
//test data for the existing insertFlightData function to use to insert the generated data into the database.

require('dotenv').config();
const { insertFlightData } = require('./insertFlightData');
const { generateFlights } = require('./generateFlights');

const testFlightData = generateFlights(10, '2023-06-01', '2024-07-17');

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