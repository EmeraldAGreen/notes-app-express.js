const express = require('express');

// Import custom middleware
const { clog } = require('../middleware/clog');

// Import our modular routers
const notesRouter = require('./notes');

const app = express();

app.use('/', notesRouter);

// // Initialize custom middleware
app.use(clog);

module.exports = app;