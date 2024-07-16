// Where flight data will fetch and store data in the database
require('dotenv').config();
const pool = require('./db');

const fetchLowestPrice = async(data) => {
  const client = await pool.connect();

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
    const result = await client.query(query, [data.outboundDate, data.origin, data.destination, data.airline]);
    return result.rows[0];
  } catch (error) {
    console.error('Error querying for lowest price entries', error.stack);
  } finally {
    client.release();
  }
};

module.exports = { fetchLowestPrice };