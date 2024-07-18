import React, { useState } from 'react';
import FlightChart from './FlightChart';
import PriceDisplay from './PriceDisplay';
import { FormControl, Typography, InputLabel, Button, Box, CircularProgress, Container, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const RetrievalForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [lowestPrice, setLowestPrice] = useState(null);
  const [lowestDate, setLowestDate] = useState(null);
  const airports = ['BOS', 'ORD'];
  const airlineMap = {
      'American Airlines': 'AA',
      'Southwest Airlines': 'WN'
    };
  const airlines = Object.keys(airlineMap);
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

  const handleReset = () => {
    setFormValues({
      origin: '',
      destination: '',
      airline: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setShowChart(false);
    setLowestDate('');
    setLowestPrice(100);

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
                value={formValues.origin}
                onChange={ handleInputChange }
                name="origin"
              >
                {airports
                  .filter(airport => airport !== formValues.destination)
                  .map((airport) => (
                    <MenuItem key={airport} value={airport}>
                      {airport}
                    </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="destination">Destination Airport</InputLabel>
              <Select
                value={formValues.destination}
                onChange={ handleInputChange }
                name="destination"
              >
                {airports
                  .filter(airport => airport !== formValues.origin)
                  .map((airport) => (
                    <MenuItem key={airport} value={airport}>
                      {airport}
                    </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="airline">Airline</InputLabel>
              <Select
                value={formValues.airline}
                onChange={ handleInputChange }
                name='airline'
              >
                {airlines.map((airline) => (
                    <MenuItem key={airlineMap[airline]} value={airlineMap[airline]}>
                      {airline}
                    </MenuItem>
                ))}
              </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Display Flight Prices'}
          </Button>
        </Box>
      </form>
      
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="outlined" color="secondary" onClick={handleReset}>
            CLEAR
      </Button>
      {showChart && responseData && lowestDate != null && lowestPrice != null &&
      (
        <>
        <PriceDisplay price={ lowestPrice } date={ lowestDate } />

        <FlightChart flightData={ responseData } startDate = { startDate } endDate = { endDate }/>
        </>
      )}
    </Box> 
  );
};

export default RetrievalForm;