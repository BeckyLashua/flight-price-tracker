import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';


const PriceDisplay = ({ price, date }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Lowest Price: ${price}</Typography>
      <Typography variant="h6">Cheapest Date: ${date}</Typography>
    </Box>
  )
};

export default PriceDisplay;