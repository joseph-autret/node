var express = require('express');
var router = express.Router();
var User = require('../schemas').User

router.use(express.json());

router.get('/api/users',(req,res) => {
  User.find({}).then(
    data => res.send(data)
  ).catch(
    err => { throw err; }
  );
});

router.get('/api/users/:id', (req, res) => {
  User.findById(req.params.id).then(user => {
    res.status(200).send(user);
  }).catch(err => {
    res.status(500).send('Error');
  });
});

router.post('/api/users', (req, res) => {
  var user = new userSchema({
    email: req.body.email,
    password: req.body.password,
    points: req.body.points
  });

  user.save().then(user => {
    res.status(200).send(user);
  }).catch(err => {
    res.status(500).send('Error');
  });
});

router.put('/api/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(user => {
    res.status(200).send(user);
  }).catch(err => {
    res.status(500).send('Error');
  });
});

router.delete('/api/users/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id).then(user => {
    if(!user){
      res.status(404).send('user not found');
    }else{res.status(200).send('user deleted');}    
  }).catch(err => {
    res.status(500).send('Error');
  });
});

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: User management
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: All users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error
 * 
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by its ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Error
 * 
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Error
 * 
 *   put:
 *     summary: Update a user by its ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Error
 * 
 *   delete:
 *     summary: Delete a user by its ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Error
 */