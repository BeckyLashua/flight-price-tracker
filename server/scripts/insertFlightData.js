const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const pool = require('../db');

const insertFlightData = async(flights) => {
  const client = await pool.connect();

  try {
    for (const flight of flights) {
      await client.query(
        'INSERT INTO flights (outbound_date, origin_airport_code, destination_airport_code, airline_code, price, currency, nonstop) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [
          flight.outbound_date, 
          flight.origin_airport_code, 
          flight.destination_airport_code, 
          flight.airline_code, 
          flight.price, 
          flight.currency, 
          flight.nonstop
        ]
      );
    }
  } catch (error) {
    console.error('Error inserting flight data into database', error);
  } finally {
    client.release();
  }
};

module.exports = { insertFlightData };