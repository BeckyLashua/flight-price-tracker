// Where flight data will fetch and store data in the database
require('dotenv').config();
const pool = require('./db');

const fetchLowestPrices = async(data) => {
  const client = await pool.connect();
  let flights = [];
  let currentDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);

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
    while (currentDate <= endDate ) {
      const result = await client.query(query, [currentDate.toISOString(), data.origin, data.destination, data.airline]);
      if (result.rows.length > 0) {
        flights.push(result.rows[0]);
      } else {
        console.log('currentDate: ', currentDate);
        flights.push({outbound_date: currentDate, price: null})
      }
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }
  } catch (error) {
    console.error('Error querying for lowest price entries', error.stack);
  } finally {
    client.release();
  }
  return flights;
};

module.exports = { fetchLowestPrices };