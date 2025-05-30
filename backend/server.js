const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// Home route
app.get('/', (req, res) => {
  res.render('index');
});

let cachedMatches = null;
let lastFetchTime = 0;

// API route

app.get('/api/matches', async (req, res) => {
     const now = Date.now();
    if (cachedMatches && now - lastFetchTime < 1000 * 60 * 10) {
        // serve cached data if fetched in the last 10 minutes
        return res.json(cachedMatches);
    }
  try {
    const now = new Date();
    
    let currentMonth = now.getMonth() + 1; 
    const currentYear = new Date().getFullYear();


    const month1 = currentMonth.toString().padStart(2, '0');
    const month2 = ((currentMonth % 12) + 1).toString().padStart(2, '0');

    const options1 = {
      method: 'GET',
      url: `https://basketapi1.p.rapidapi.com/api/basketball/matches/12/${month1}/${currentYear}`,
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'basketapi1.p.rapidapi.com',
      },
    };

    const options2 = {
      method: 'GET',
      url: `https://basketapi1.p.rapidapi.com/api/basketball/matches/12/${month2}/${currentYear}`,
      headers: options1.headers,
    };

    const [res1, res2] = await Promise.all([
      axios.request(options1),
      axios.request(options2),
    ]);

    // Combine and filter out finished or canceled matches
    const allMatches = [...res1.data.events, ...res2.data.events].filter(
      (match) =>
        match.status?.type?.toLowerCase() !== 'finished' &&
        match.status?.type?.toLowerCase() !== 'canceled'
    );

    allMatches.sort((a, b) => a.startTimestamp - b.startTimestamp);
    cachedMatches = allMatches;
    lastFetchTime = now;
    

    res.json(allMatches);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Error fetching data' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
