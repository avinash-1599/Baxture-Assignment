const express = require('express');
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const mode = process.env.NODE_ENV || 'development';
const indexRoute = require("./src/routes/index");

app.use(express.json());

app.use('/', indexRoute);

// Start the server
if (mode === 'development') {
    app.listen(PORT, () => {
      console.log(`Server is running in development mode on port ${PORT}`);
    });
  } else {
    app.listen(PORT, () => {
      console.log(`Server is running in production mode on port ${PORT}`);
    });
  }
