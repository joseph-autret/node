const mongoose = require('mongoose');
const { Schema } = mongoose;

const tripSchema = new mongoose.Schema({
    departureLocation: String,
    departureTime: Date,
    destinationLocation: String,
    destinationTime: Date,
    date: Date,
    seats: Number,
    done: Boolean,
    driver: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    passengers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    vehicle: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle'
    }
    });

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    address: {
        street: String,
        city: String,
        postalCode: String
    },
    password: String,
    points: Number,
    role: Number,
    trips: [{
        type: Schema.Types.ObjectId,
        ref: 'Trip'
    }],
    vehicles: [{
        type: Schema.Types.ObjectId,
        ref: 'Vehicle'
    }]
});

const vehicleSchema = new mongoose.Schema({
    name: String,
    type: String,
    seats: Number,
    options: [String],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = {
    Trip: mongoose.model('Trip', tripSchema),
    User: mongoose.model('User', userSchema),
    Vehicle: mongoose.model('Vehicle', vehicleSchema)
};