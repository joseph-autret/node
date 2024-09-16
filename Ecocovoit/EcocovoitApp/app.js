// Imports
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

// Constants
const host = '127.0.0.1';
const port = 3001;

// Load environment variables
dotenv.config();

// Router requires
const indexRouter = require('./routes/index');
const tripsRouter = require('./routes/trips');
const usersRouter = require('./routes/users');
const vehicleRouter = require('./routes/vehicle');

// Middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`Requête http: ${req.method} - url: ${req.url} - Client:
 ${req.get('User-Agent')}`)
  next();
}
);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Use the routers
app.use('/', indexRouter, tripsRouter, usersRouter, vehicleRouter);


// Start the server
app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});

