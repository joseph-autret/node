const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ecocovoit API',
            version: '1.0.0',
            description: 'API for the Ecocovoit application',
            contact: {
                name: 'Ecocovoit Team',
                email: 'contact@ecocovoit.net',
                url: 'https://ecocovoit.net'
            }
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            format: 'uuid'
                        },
                        username: {
                            type: 'string'
                        },
                        email: {
                            type: 'string'
                        },
                        address: {
                            type: 'object',
                            properties: {
                                street: {
                                    type: 'string'
                                },
                                city: {
                                    type: 'string'
                                },
                                postalCode: {
                                    type: 'string'
                                }
                            }
                        },
                        password: {
                            type: 'string'
                        },
                        points: {
                            type: 'number'
                        },
                        role: {
                            type: 'number'
                        },
                        trips: {
                            type: 'array',
                            items: {
                                type: 'string',
                                format: 'uuid'
                            }
                        },
                        vehicles: {
                            type: 'array',
                            items: {
                                type: 'string',
                                format: 'uuid'
                            }
                        }
                    }
                },
                Vehicle: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            format: 'uuid'
                        },
                        name: {
                            type: 'string'
                        },
                        type: {
                            type: 'string'
                        },
                        seats: {
                            type: 'number'
                        },
                        options: {
                            type: 'array',
                            items: {
                                type: 'string'
                            }
                        },
                        owner: {
                            type: 'string',
                            format: 'uuid'
                        }
                    }
                },
                Trip: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            format: 'uuid'
                        },
                        departureLocation: {
                            type: 'string'
                        },
                        departureTime: {
                            type: 'string',
                            format: 'date-time'
                        },
                        destinationLocation: {
                            type: 'string'
                        },
                        destinationTime: {
                            type: 'string',
                            format: 'date-time'
                        },
                        date: {
                            type: 'string',
                            format: 'date'
                        },
                        seats: {
                            type: 'number'
                        },
                        done: {
                            type: 'boolean'
                        },
                        driver: {
                            type: 'string',
                            format: 'uuid'
                        },
                        passengers: {
                            type: 'array',
                            items: {
                                type: 'string',
                                format: 'uuid'
                            }
                        },
                        vehicle: {
                            type: 'string',
                            format: 'uuid'
                        }
                    }
                }
            }
        }
    },
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;