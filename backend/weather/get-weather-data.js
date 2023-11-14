const axios = require('axios');
const net = require('net');
const mysql = require('mysql');

const apiKey = 'cddcb198601b13f98d52cbc3fb785150';
const city = 'Vienna,at';
const vc_apiKey = 'UBFHP8AAFQLSD7WT2TRQKQ7UT';
const vc_city = 'Vienna,AT';

const dbConfig = {
  host: 'localhost',
  user: 'hv',
  password: '.k(Wy3=PZ9q36n?fZv',
  database: 'hausverwaltung'
};

const connection = mysql.createConnection(dbConfig);
// Calculate the start and end dates for the last 2 days
const endDate = new Date();
const startDate = new Date();
startDate.setDate(endDate.getDate() - 2);

// Format the dates for the API request
const formattedStartDate = startDate.toISOString().split('T')[0];
const formattedEndDate = endDate.toISOString().split('T')[0];

const vc_apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${vc_city}/${formattedStartDate}/${formattedEndDate}?unitGroup=metric&key=${vc_apiKey}`;

// Get the current date
const currentDate = new Date();
// Format the date to match the API response
const formattedCurrentDate = currentDate.toISOString().split('T')[0];

// Change the forecast duration to 5 days
const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

let past2Days;
let next2Days;
let weatherError = false;

// Function to get the formatted date for the next N days
function getFormattedDate(date, daysToAdd) {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + daysToAdd);
  return newDate.toISOString().split('T')[0];
}

function getWeatherData() {
    // First API call for OpenWeatherMap
    axios.get(apiUrl)
      .then(response => {
        const forecastData = response.data.list;

        let totalTemperature = 0;
        let count = 0;
        let isRaining = false;
        let isSnowing = false;

        forecastData.forEach(interval => {
          const timestamp = interval.dt_txt;
          const date = timestamp.split(' ')[0];
          const temperature = interval.main.temp;
          const weatherDescription = interval.weather[0].description;

          // Filter data for today, tomorrow, and the day after tomorrow
          if (date === formattedCurrentDate || date === getFormattedDate(currentDate, 1) || date === getFormattedDate(currentDate, 2)) {
            totalTemperature += temperature;
            count++;

            if (weatherDescription.includes('rain')) {
              isRaining = true;
            }

            if (weatherDescription.includes('snow')) {
              isSnowing = true;
            }
          }
        });

        const averageTemperature = totalTemperature / count;

        // JSON Output
        next2Days = {
          avg_temp: `${averageTemperature.toFixed(2)}`,
          rain: isRaining ? 'yes' : 'no',
          snow: isSnowing ? 'yes' : 'no'
        };
      })
      .catch(error => {
        // JSON Output in case of error
        next2Days = {
          avg_temp: "error",
          rain: "error",
          snow: "error",
          error: error.message
        };
        weatherError = true;
      })
      .finally(() => {
        // Second API call for Visual Crossing
        axios.get(vc_apiUrl)
          .then(response => {
            const weatherData = response.data.days;

            let rainOccurred = "no";
            let snowOccurred = "no";
            let totalTemperature = 0;
            let count = 0;

            weatherData.forEach(day => {
              const precipitation = day.precip;
              const weatherDescription = day.conditions;
              const temperatureMax = day.tempmax;
              const temperatureMin = day.tempmin;

              if (precipitation > 0) {
                if (weatherDescription.toLowerCase().includes('snow')) {
                  snowOccurred = "yes";
                } else if (weatherDescription.toLowerCase().includes('rain')) {
                  rainOccurred = "yes";
                }
              }

              //console.log (weatherDescription, temperatureMax, temperatureMin, snowOccurred)

              totalTemperature += (temperatureMax + temperatureMin) / 2;
              count++;
            });

            const overallAverageTemperature = totalTemperature / count;

            // JSON Output for Visual Crossing
            past2Days = {
              avg_temp: overallAverageTemperature.toFixed(2),
              rain: rainOccurred,
              snow: snowOccurred
            };
          })
          .catch(error => {
            // JSON Output in case of error for Visual Crossing
            past2Days = {
              avg_temp: 'error',
              rain: 'error',
              snow: 'error',
              error: error.message
            };
            weatherError = true;
          })
          .finally(() => {
            // Combine both sets of data into a final JSON object
            const finalJson = { past2Days, next2Days };
            //console.log(finalJson);

            connection.connect(err => {
              if (err) {
                console.log(err);
                return;
              }
            
              let sql = 'INSERT INTO weather (data) VALUES (?)';
              let values = [JSON.stringify(finalJson)];

              connection.query(sql, values, (error) => {
                console.log("Weather-Database updated successfully!")
            
                if (error) {
                  console.log(error);
                }
              }); 

              if (weatherError) {
                console.log('Error in loading weather-data, check logs!')
                sql = 'INSERT INTO logs (event_type, description, task) VALUES (\'weather\', ?, \'Morning\')';
                values = [JSON.stringify(finalJson)];

                connection.query(sql, values, (error) => {
                  console.log("Logs-Database updated successfully!")
              
                  if (error) {
                    console.log(error);
                  }
                }); 
              } else {
                console.log('Weather-data loaded, logs updated.')
                sql = 'INSERT INTO logs (event_type, description, task) VALUES (\'weather\', ?, \'Morning\')';
                values = 'Weather-data imported to DB succesfully!';

                connection.query(sql, values, (error) => {
                  console.log("Logs-Database updated successfully!")
              
                  if (error) {
                    console.log(error);
                  }
                }); 
              }

              connection.end(); // Close the connection after the query
            });

            return finalJson;
          });
      });
  }

  console.log("Getting weather from API...");
  getWeatherData();
  
