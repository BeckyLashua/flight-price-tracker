import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

const RetrievalForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const requestData = {
        outboundDate: '2024-07-15T08:00:00',
        origin: 'BOS',
        destination: 'ORD',
        airline: 'WN'
      }
      const response = await axios.post('http://localhost:3001/flight-data', requestData);
      setResponseData(response.data);
      console.log(response.data);
    } catch (error) {
      setError('Error fetching data');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClick} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Display Flight Prices'}
      </Button>
      {error && <p>{error}</p>}
      {responseData && <div>{JSON.stringify(responseData, null, 2)}</div>}
    </div>
  );
};

export default RetrievalForm;