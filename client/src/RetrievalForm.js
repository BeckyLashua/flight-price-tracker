import React, { useState } from 'react';
import FlightChart from './FlightChart';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

const RetrievalForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [outboundDate, setOutboundDate] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [airline, setAirline] = useState(null);
  const [numOfDays, setNumOfDays] = useState(0);
  const [endDate, setEndDate] = useState(null);
  const [showChart, setShowChart] = useState(false);



  const handleClick = async () => {
    setLoading(true);
    setError(null);
    setShowChart(false);
    setOutboundDate('2023-08-04T08:00:00');
    setOrigin('BOS');
    setDestination('ORD');
    setAirline('AA');
    setNumOfDays(365);

    try {
      const startDate = new Date(outboundDate);
      const endDate = new Date(startDate.setDate(startDate.getDate() + numOfDays));
      setEndDate(endDate.toISOString());

      const requestData = {
        outboundDate: outboundDate,
        origin: origin,
        destination: destination,
        airline: airline,
        numOfDays: numOfDays
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
        <FlightChart flightData={ responseData } startDate = { outboundDate } endDate = { endDate }/>
      )}
    </div>
  );
};

export default RetrievalForm;