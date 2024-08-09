// Where flight data will fetch and store data in the database
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const Amadeus = require('amadeus');
//const cron = require('node-cron');
//const { insertFlightData } = require('./insertFlightData');


const fetchFlightData = async(origin, destination, outboundDate) => {
  const amadeus = new Amadeus({
    clientId: process.env.API_KEY,
    clientSecret: process.env.API_SECRET
  });

  amadeus.analytics.itineraryPriceMetrics.get({
    originIataCode: origin,
    destinationIataCode: destination,
    departureDate: outboundDate,
    currencyCode: 'USD',
    oneWay: true
  }).then(function (response) {
    const respponseData = JSON.stringify(response.data, null, 2);
    console.log(respponseData);
  }).catch(function (response) {
    console.error(`Error: ${error.response ? error.response.status : 'No Response'}, ${error.response ? error.response.statusText : error.message}`);
  });
    
  // set relevant response data


    /* set relevant response data
    const outbound_date = response.departureDate; 
    const origin_airport_code = response.origin.iataCode;
    const destination_airport_code = response.destination.iataCode;
    const price = response.priceMetrics;
    const currency = 'USD';
    const nonstop = true;
    console.log(outboundDate, origin_airport_code, destination_airport_code, price, currency, USD, nonstop); 

    // insert the filtered data object into database
    //await insertFlightData(parsedData);
    //console.log(`Inserted ${parsedData.length} flight records into the database.`);
    */ 
};

// Prepare API call request
const origin = 'BOS';
const destination = 'ORD';
const outboundDate = '2023-07-09'; // past day formatted 

fetchFlightData(origin, destination, outboundDate);

/*
// Schedule a task to run this daily
cron.schedule('0 0 * * *', () => {
  console.log('Fetching flight prices...');
  fetchFlightData(origin, destination, outboundDate);
});
*/

module.exports = { fetchFlightData };