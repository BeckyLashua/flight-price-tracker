//The testInsertFlightData function uses the existing generateFlights function to generate
//test data for the existing insertFlightData function to use to insert the generated data into the database.

require('dotenv').config();
const { insertFlightData } = require('./insertFlightData');
const { generateFlights } = require('./generateFlights');

const pastFlightData = generateFlights(10, '2023-06-01', '2024-07-17');

const populateFlightData = async () => {
  if (pastFlightData) {
    await insertFlightData(pastFlightData);
    console.log('Flight data inserted successfully.');
  } else {
    console.log('Failed to fetch flight data.');
  }
};

// Run tests
const runPopulation = async () => {
  await populateFlightData();
};

runPopulation();