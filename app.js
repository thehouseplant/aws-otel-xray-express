'use strict';

require('./tracing');
const express = require('express');

// Initialize Express
const app = express();

// Define default server port
const port = process.env.PORT || 3000;

// Define application routes
app.get('/', (req, res) => {
  res.send('Entrypoint');
});

app.get('/api/data', (req, res) => {
  // Simulate work
  setTimeout(() => {
    res.json({ message: 'Data from API', timestamp: new Date() });
  }, 100);
});

app.listen(port, () => {
  console.log(`Application listening on http://localhost:${port}`);
});
