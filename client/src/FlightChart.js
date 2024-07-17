import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { eachDayOfInterval, format } from 'date-fns';


const FlightChart = ({ flightData, startDate, endDate}) => {
  const chartRef = useRef(null);
  const instance = useRef(null);

  useEffect(() => {
    if (chartRef.current && flightData.length > 0) {
      const ctx = chartRef.current.getContext('2d');

      const dates = eachDayOfInterval({
        start: startDate,
        end: endDate,
      }).map(date => format(date, 'yyyy-MM-dd'));

      const datesToPrices = flightData.reduce((acc, flight) => {
        if (flight && flight.outbound_date) {
          const date = flight.outbound_date.split('T')[0];
          acc[date] = flight.price;
        }
        return acc;
      }, {});

      const labels = dates;
      const prices = dates.map(date => datesToPrices[date] !== undefined ? datesToPrices[date] : null);

      const data = {
        labels,
        datasets: [
          {
            label: 'Lowest Flight Prices Per Day',
            data: prices,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
            tension: 0.1,
            spanGaps: true,
          },
        ],
      };

      const config = {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
              },
            },
            y: {
              beginAtZero: true,
            }
          },
        },
      };

      // Destroy chart instance that might already exist
      if (instance.current) {
        instance.current.destroy();
      }

      instance.current = new Chart(ctx, config);

      return () => {
        if (instance.current) {
          instance.current.destroy();
        }
        
      };
    }
  }, [flightData, startDate, endDate]);

  return <canvas ref={chartRef} />;
};

export default FlightChart;