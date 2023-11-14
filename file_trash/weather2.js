// UBFHP8AAFQLSD7WT2TRQKQ7UT
const axios = require('axios');

const vc_apiKey = 'UBFHP8AAFQLSD7WT2TRQKQ7UT';
const vc_city = 'Vienna,AT';

// Calculate the start and end dates for the last 2 days
const endDate = new Date();
const startDate = new Date();
startDate.setDate(endDate.getDate() - 2);

// Format the dates for the API request
const formattedStartDate = startDate.toISOString().split('T')[0];
const formattedEndDate = endDate.toISOString().split('T')[0];

const vc_apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${vc_city}/${formattedStartDate}/${formattedEndDate}?unitGroup=metric&key=${vc_apiKey}`;

axios.get(vc_apiUrl)
  .then(response => {
    const weatherData = response.data.days;

    let rainOccurred = false;
    let snowOccurred = false;
    let totalTemperature = 0;
    let count = 0;

    weatherData.forEach(day => {
      const precipitation = day.precip;
      const weatherDescription = day.conditions;
      const temperatureMax = day.tempmax;
      const temperatureMin = day.tempmin;

      if (precipitation > 0) {
        if (weatherDescription.toLowerCase().includes('snow')) {
          snowOccurred = true;
        } else if (weatherDescription.toLowerCase().includes('rain')) {
          rainOccurred = true;
        }
      }

      totalTemperature += (temperatureMax + temperatureMin) / 2;
      count++;
    });

    const overallAverageTemperature = totalTemperature / count;

    const outputData = {
      rainOccurred,
      snowOccurred,
      overallAverageTemperature: overallAverageTemperature.toFixed(2)
    };

    console.log(JSON.stringify(outputData, null, 2));
  })
  .catch(error => {
    const errorOutput = {
      rainOccurred: 'error',
      snowOccurred: 'error',
      overallAverageTemperature: 'error',
      error: error.message
    };
    console.log(JSON.stringify(errorOutput, null, 2));
  });
