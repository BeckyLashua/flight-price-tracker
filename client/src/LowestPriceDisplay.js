import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const LowestPriceDisplay = ( {flightData, startDate, endDate} ) => {
  const [lowestPrice, setLowestPrice] = useState(null);
  const [cheapestDate, setCheapestDate] = useState(null);

  useEffect(() => {
    let cheapestFlight = flightData[0];

    flightData.forEach(flight => {
      if (flight && flight.outbound_date && flight.price && flight.price < cheapestFlight.price) {
        cheapestFlight = flight;
        console.log('cheapest price: ', flight.price);
      }
    });

    let cheapestDate = cheapestFlight.outbound_date.split('T')[0];
    const [year, month, day] = cheapestDate.split('-');
    setCheapestDate(`${month}-${day}-${year}`);
    setLowestPrice(cheapestFlight.price);
  } ,[]);

  
  return (
    <Box>
      <h5>The date and price of the cheapest flight: <p>Date: </p>{cheapestDate} <p>Price: </p>${lowestPrice}</h5>
    </Box>
  );
 
};

export default LowestPriceDisplay;