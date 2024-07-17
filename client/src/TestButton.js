import React, { useState } from 'react';
import FlightChart from './FlightChart';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

const TestButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [airline, setAirline] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showChart, setShowChart] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    setShowChart(false);
    setStartDate('2023-07-19T08:00:00');
    setEndDate('2024-07-17T08:00:00')
    setOrigin('BOS');
    setDestination('ORD');
    setAirline('AA');

    try {
      //const endDate = new Date();
      //const startDate = new Date(endDate.setDate(endDate.getDate() - 365));
      //setEndDate(endDate.toISOString());
      //console.log('startDate: ', startDate);
      //console.log('endDate: ', endDate);

      const requestData = {
        startDate: startDate,
        endDate: endDate,
        origin: origin,
        destination: destination,
        airline: airline
      }

      const response = await axios.post('http://localhost:3001/flight-data', requestData);
      setResponseData(response.data);
      console.log(response.data);
      setShowChart(true);
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
      {showChart && responseData && 
      (
        <FlightChart flightData={ responseData } startDate = { startDate } endDate = { endDate }/>
      )}
    </div>
  );
};

export default TestButton;