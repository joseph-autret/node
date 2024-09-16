var express = require('express');
var router = express.Router();
var Trips = require('../schemas').Trip

router.use(express.json());

router.get('/api/trips', (req, res) => {
  Trips.find({}).then(
    data => res.send(data)
  ).catch(
    err => { throw err; }
  );
});

router.get('/api/trips/:id', (req, res) => {
  Trips.findById(req.params.id).then(trip => {
    res.status(200).send(trip);
  }).catch(err => {
    res.status(500).send('Error');
  });
});

router.post('/api/trips', (req, res) => {
  var trip = new Trips({
    departureLocation: req.body.departureLocation,
    departureTime: req.body.departureTime,
    destinationLocation: req.body.destinationLocation,
    destinationTime: req.body.destinationTime,
    date: req.body.date,
    seats: req.body.seats,
    done: req.body.done,
    driver: req.body.driver,
    passengers: req.body.passengers,
    vehicle: req.body.vehicle
  });

  trip.save().then(trip => {
    res.status(200).send(trip);
  }).catch(err => {
    res.status(500).send('Error');
  });
});

router.put('/api/trips/:id', (req, res) => {
  Trips.findByIdAndUpdate
    (req.params.id, req.body, { new: true }).then(trip => {
      res.status(200).send(trip);
    }).catch(err => {
      res.status(500).send('Error');
    });
});

router.delete('/api/trips/:id', (req, res) => {
  Trips.findByIdAndDelete(req.params.id).then(trip => {
    if (!trip) {
      res.status(404).send('trip not found');
    } else { res.status(200).send('trip deleted'); }
  }).catch(err => {
    res.status(500).send('Error');
  });
});

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Trips
 *  description: Trip management
 * 
 */
 
/**
 * @swagger
 * /api/trips:
 *   get:
 *     tags:
 *       - Trips
 *     description: Get all trips
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '500':
 *         description: Error
 *   post:
 *     tags:
 *       - Trips
 *     description: Create a new trip
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trip'
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '500':
 *         description: Error
 *
 * /api/trips/{id}:
 *   get:
 *     tags:
 *       - Trips
 *     description: Get a trip by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the trip
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '500':
 *         description: Error
 *   put:
 *     tags:
 *       - Trips
 *     description: Update a trip by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the trip
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Trip'
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '500':
 *         description: Error
 *   delete:
 *     tags:
 *       - Trips
 *     description: Delete a trip by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the trip
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '404':
 *         description: Trip not found
 *       '500':
 *         description: Error
 */