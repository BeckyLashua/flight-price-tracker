const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const pool = require('../db');

const insertFlight= async(flight) => {
  const client = await pool.connect();

  try {
    await client.query(
      'INSERT INTO flights (outbound_date, origin_airport_code, destination_airport_code, price, currency, nonstop) VALUES ($1, $2, $3, $4, $5, $6)',
      [
        flight.outboundDate, 
        flight.origin, 
        flight.destination,  
        flight.price, 
        flight.currency, 
        flight.nonstop
      ]
    );
  } catch (error) {
    console.error('Error inserting flight data into database', error);
  } finally {
    client.release();
  }
};

module.exports = { insertFlight };