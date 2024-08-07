import React, { useState } from 'react';
import FlightChart from './FlightChart';
import { FormControl, InputLabel, Button, Box, CircularProgress, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const RetrievalForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [formValues, setFormValues] = useState({
    origin: '',
    destination: '',
    airline: '',
  });
  const [endDate, setEndDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [showChart, setShowChart] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setShowChart(false);

    const { origin, destination, airline } = formValues;
    if ( !origin || !destination || !airline ) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }
    
    try {
      const today = new Date();
      const endDate = new Date(today.setDate(today.getDate()));
      const startDate = new Date(today.setDate(today.getDate() - 365 ));
      setEndDate(endDate.toISOString());
      setStartDate(startDate.toISOString());

      const requestData = {
        startDate: startDate,
        endDate: endDate,
        origin: formValues.origin,
        destination: formValues.destination,
        airline: formValues.airline
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
    <Box sx={{ mt: 4 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: '0 auto' }}>
          <FormControl>
              <InputLabel id="origin">Origin Airport</InputLabel>
              <Select
                labelId="origin"
                name="origin"
                value={formValues.origin}
                onChange={handleInputChange}
              >
                <MenuItem value="BOS">BOS</MenuItem>
                <MenuItem value="ORD">ORD</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="destination">Destination Airport</InputLabel>
              <Select
                labelId="destination"
                name="destination"
                value={formValues.destination}
                onChange={handleInputChange}
              >
                <MenuItem value="BOS">BOS</MenuItem>
                <MenuItem value="ORD">ORD</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="airline">Destination Airport</InputLabel>
              <Select
                labelId="airline"
                name="airline"
                value={formValues.airline}
                onChange={handleInputChange}
              >
                <MenuItem value="AA">American Airlines</MenuItem>
                <MenuItem value="WN">Southwest</MenuItem>
              </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Display Flight Prices'}
          </Button>
        </Box>
      </form>
      
      {error && <p>{error}</p>}
      {showChart && responseData && 
      (
        <FlightChart flightData={ responseData } startDate = { startDate } endDate = { endDate }/>
      )}
    </Box>
  );
};

export default RetrievalForm;