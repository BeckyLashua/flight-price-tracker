// Where flight data will fetch and store data in the database
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const Amadeus = require('amadeus');
const cron = require('node-cron');
const { insertFlight } = require('./insertFlight');


const fetchFlightData = async(origin, destination, outboundDate, currencyCode, oneWay) => { 
  try {
    const amadeus = new Amadeus({
      clientId: process.env.API_KEY,
      clientSecret: process.env.API_SECRET
    }); 

    const response = await amadeus.analytics.itineraryPriceMetrics.get({
      originIataCode: origin,
      destinationIataCode: destination,
      departureDate: outboundDate,
      currencyCode: currencyCode,
      oneWay: oneWay
    });

    const price =response.data[0].priceMetrics[2].amount;
    console.log(price);

    const flight = {
      "outboundDate": outboundDate, 
      "origin": origin, 
      "destination": destination,  
      "price": price, 
      "currency": currencyCode, 
      "nonstop": oneWay
    };

    console.log('flight: ', flight);
    // insert the flights into database
    insertFlight(flight);
    console.log("Flight data inserted.");
  } catch (error) {
    console.log(`Error: ${error.message}`);
  };
}

/*
const populateFlightData = async () => {
  // Prepare API call request
  const origin = 'BOS';
  const destination = 'ORD';
  let insertionDate = new Date();
  insertionDate.setDate(insertionDate.getDate() - 365 );
  const currencyCode = 'USD';
  const oneWay = true;

  for (let i = 0; i < 365; i++) {
    console.log('insertionDate: ', insertionDate);
    await fetchFlightData(origin, destination, insertionDate.toISOString().split('T')[0], currencyCode, oneWay);
    console.log('insertionDate: ', insertionDate);
  
    await fetchFlightData(destination, origin, insertionDate.toISOString().split('T')[0], currencyCode, oneWay);
    insertionDate = new Date(insertionDate.setDate(insertionDate.getDate() + 1));
  }
};

populateFlightData();
*/


/* Schedule a task to run this daily
cron.schedule('0 0 * * *', () => {
  console.log('Fetching flight prices...');

  fetchFlightData(origin, destination, outboundDate, currencyCode, oneWay);
  fetchFlightData(destination, origin, outboundDate, currencyCode, oneWay);
});
*/


module.exports = { fetchFlightData };

