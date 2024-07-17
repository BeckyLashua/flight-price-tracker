// Where flight data will fetch and store data in the database
require('dotenv').config();
const pool = require('./db');

const fetchLowestPrices = async(data, numOfDays) => {
  const client = await pool.connect();
  let flights = [];
  let current_date = new Date(data.outboundDate);

  try {
    const query = `
      SELECT * 
      FROM flights  
      WHERE outbound_date = $1  
      AND origin_airport_code = $2 
      AND destination_airport_code = $3  
      AND airline_code = $4  
      AND currency = 'USD'
      AND nonstop = true
      ORDER BY price ASC  
      LIMIT 1;
    `;
    for (let i = 0; i < numOfDays; i++) {
      const result = await client.query(query, [current_date.toISOString(), data.origin, data.destination, data.airline]);
      if (result.rows.length > 0) {
        flights.push(result.rows[0]);
      }
      console.log(result);
      current_date = new Date(current_date.setDate(current_date.getDate() + 1));  
    }
  } catch (error) {
    console.error('Error querying for lowest price entries', error.stack);
  } finally {
    client.release();
  }
  return flights;
};

module.exports = { fetchLowestPrices };