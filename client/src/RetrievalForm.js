import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

const RetrievalForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3001/flight-data');
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
      <Button variant="contained" color="primary" onClick={handleClick}>
        {loading ? <CircularProgress size={24} /> : 'Fetch Flight Data'}
      </Button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default RetrievalForm;