const express = require('express');
const cors = require('cors');
const errorHandler = require('errorhandler');

const dotenv = require('dotenv'); 
dotenv.config();

//Initiate our app
const app = express();

const corsOptions = {
  origin: ['https://dambns.vercel.app','http://localhost:8000'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//Configure our app
app.use(cors(corsOptions))
app.use(express.json());

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError)
    return res.status(400).json({ error: 'Invalid JSON provided' });
  
  next()
});

// log error if in dev mode
const isProduction = process.env.NODE_ENV === 'production';
if(!isProduction) {
  app.use(errorHandler());
}

//Enabling CORS Pre-Flight
app.options('*', cors());

// routes
const routes = require('./routes');
app.use(routes);

// fallback routes
app.all('*', (req, res) => {
  res.status(404).send('Endpoint Not Found');
});

module.exports = app;