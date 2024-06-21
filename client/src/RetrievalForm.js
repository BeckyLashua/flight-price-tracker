import React, { useState } from 'react';
import Button from '@mui/material/Button';
//import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

const RetrievalForm = () => {
  const handleClick = async () => {
    try {
      const response = await axios.get('http://localhost:3001/flight-data');
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      Fetch Flight Data
    </Button>
  );
};

export default RetrievalForm;