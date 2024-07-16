//Flight Data Generation: The generateFlights function creates an array of flight data objects
//over the course of a specific time frame. 
//Each object contains random values for several fields using faker.


const generateFlights = (flightsPerDay, date1String, date2String) => {
  let flights = [];
  // convert dates to date objects    
  let current_date = new Date(date1String);
  const date2 = new Date(date2String);
  let isBoston = true;

  while (current_date <= date2) {
    for (let i = 0; i < flightsPerDay; i++) {
      let outbound_date = current_date.toISOString();
      const origin_airport_code = isBoston ? 'BOS' : 'ORD';  // limiting to two locations for now
      const destination_airport_code = origin_airport_code === 'BOS' ? 'ORD' : 'BOS';  // limiting to two locations for now
      const airline_code = 'AA'; // limiting to 1 airline for now
      let price = Math.floor(Math.random() * (1000 - 50 + 1)) + 50;
      const currency = 'USD'; // hard coded for now
      const nonstop = true;

      flights.push({
        outbound_date,
        origin_airport_code,
        destination_airport_code,
        airline_code,
        price,
        currency,
        nonstop
      });

      isBoston = !isBoston;
    }
    // update the day by one day
    current_date = new Date(current_date.setDate(current_date.getDate() + 1));
  }

  return flights;
}

module.exports = { generateFlights };