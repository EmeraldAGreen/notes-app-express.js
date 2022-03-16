const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes');

const PORT = process.env.PORT|| 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(clog);


// deliver everything in the public directory as static content
app.use(express.static('public'));
app.use('/api', api);

// HTML ROUTE: `GET /notes` should return the `notes.html` file.
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// HTML ROUTE: `GET *` should return the `index.html` file.
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// HTML ROUTE: `GET *` 404 ERROR
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/404.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
