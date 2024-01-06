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

let isFetching = false; 

cron.schedule('16 15 * * *', async () => {
  if (!isFetching) {
    isFetching = true; 
    try {
      
      const response = await axios.get(process.env.API_KEY);
      const data = response.data;
      
      console.log('Fetched data:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      isFetching = false; 
    }
  } else {
    console.log('Already fetching data. Skipping this interval.');
  }
});
