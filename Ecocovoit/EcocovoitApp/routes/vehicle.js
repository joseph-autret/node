var express = require('express');
var router = express.Router();
var Vehicle = require('../schemas').Vehicle

router.use(express.json());

router.get('/api/vehicles', (req, res) => {
    Vehicle.find({}).then(
        data => res.send(data)
    ).catch(
        err => { throw err; }
    );
});
    
router.get('/api/vehicles/:id', (req, res) => {
    Vehicle.findById(req.params.id).then(vehicle => {
        res.status(200).send(vehicle);
    }).catch(err => {
        res.status(500).send('Error');
    });
});

router.post('/api/vehicles', (req, res) => {
    var vehicle = new Vehicle({
        name: req.body.name,
        seats: req.body.seats,
        options: req.body.options,
        owner: req.body.owner
    });

    vehicle.save().then(vehicle => {
        res.status(200).send(vehicle);
    }).catch(err => {
        res.status(500).send('Error');
    });
});

router.put('/api/vehicles/:id', (req, res) => {
    Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(vehicle => {
        res.status(200).send(vehicle);
    }).catch(err => {
        res.status(500).send('Error');
    });
});

router.delete('/api/vehicles/:id', (req, res) => {
    Vehicle.findByIdAndDelete(req.params.id).then(vehicle => {
        if (!vehicle) {
            res.status(404).send('vehicle not found');
        } else {
            res.status(200).send('vehicle deleted');
        }
    }).catch(err => {
        res.status(500).send('Error');
    });
});

module.exports = router;

/**
 * Swagger tags for vehicle management.
 * @swagger
 * tags:
 *  name: Vehicles
 *  description: Vehicle management
 */

/**
 * Swagger route for getting all vehicles.
 * @swagger
 * /api/vehicles:
 *   get:
 *     summary: Get all vehicles
 *     tags: [Vehicles]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */

/**
 * Swagger route for getting a specific vehicle by ID.
 * @swagger
 * /api/vehicles/{id}:
 *   get:
 *     summary: Get a vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the vehicle
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */

/**
 * Swagger route for creating a new vehicle.
 * @swagger
 * /api/vehicles:
 *   post:
 *     summary: Create a new vehicle
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */

/**
 * Swagger route for updating a vehicle by ID.
 * @swagger
 * /api/vehicles/{id}:
 *   put:
 *     summary: Update a vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the vehicle
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vehicle'
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Error
 */

/**
 * Swagger route for deleting a vehicle by ID.
 * @swagger
 * /api/vehicles/{id}:
 *   delete:
 *     summary: Delete a vehicle by ID
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the vehicle
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Vehicle not found
 *       500:
 *         description: Error
 */
