// server/index.js
const express = require('express');
const http = require('http');
const initSocket = require('./socket');
const cors = require('cors');
const noteRoutes = require('./routes/notes');

const app = express();
const server = http.createServer(app);

const io = initSocket(server); // initializes socket

app.use(cors());
app.use(express.json());

// Make io accessible in routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/notes', noteRoutes);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});