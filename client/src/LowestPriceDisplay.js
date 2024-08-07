import React, { useState } from 'react';
import FlightChart from './FlightChart';
import { FormControl, InputLabel, Button, Box, CircularProgress, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const LowestPriceDisplay = ( {date, price} ) => {
  return (
  <Box>
    <h5>The date with the lowest price of ${price} was {date}</h5>
  </Box>
  );
 
};

export default LowestPriceDisplay;