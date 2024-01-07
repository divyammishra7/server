require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const axios = require('axios');

const app = express();
app.get('/', (req, res) => {
  res.send('app');
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
cron.schedule('55 8 * * *', async () => {
  if (!isFetching) {
    isFetching = true; // Set flag to true to indicate an ongoing fetch operation

    let counter = 0;
    let shouldFetch = true;
    const interval = setInterval(async () => {
      if (!shouldFetch) {
        clearInterval(interval);
        return;
      }
      try {
        // Make the API call using Axios (replace with your API URL)
        const response = await axios.get(process.env.API_KEY_FIRST);
        
        const data = response.data;
        // Process the fetched data here
        // console.log('Fetched data:', data);

        // Clear interval when data is fetched successfully
        clearInterval(interval);
      } catch (error) {
        console.error('Error fetching data:', error);

        counter += 1;
        if (counter >= 36) { // Adjust the counter to fetch for 3 minutes (36 iterations, 5 sec each)
          clearInterval(interval); // Stop interval after 3 minutes
        
        }
      } finally {
      
          clearInterval(interval); // Stop interval if isFetching becomes false
        
      }
    }, 5000); // Fetch every 5 seconds (adjust this interval as needed)
  } else {
    console.log('Already fetching data. Skipping this interval.');
  }
});


let isFetching = false; // Flag to track ongoing fetch operation

cron.schedule('00 9 * * *', async () => {
 
 
    
      try {
        // Make the API call using Axios (replace with your API URL)
        const response = await axios.get(process.env.API_KEY_SECOND);
        
        const data = response.data;
        // Process the fetched data here
        console.log('Fetched data:', data);

        // Clear interval when data is fetched successfully
        
      } catch (error) {
        console.error('Error fetching data:', error);

      
      } 
});
