# Work Log

## Sprint 1

### Liam

- Modified the user collection according to the planned schema. The new schema is as follows:

  ```json
  {
    "username": "string",
    "email": "string",
    "address": {
      "street": "string",
      "city": "string",
      "zip": "string"
    },
    "password": "string",
    "points": "number",
    "role": "number",
    "Trips": [
      {
        <!-- id of a trip object -->
      }
    ]
  }
  ```

- Added a vehicle collection to the database. The schema is as follows:

  ```json
  {
    "name": "string",
    "type": "string",
    "seats": "number",
    "options": ["string"],
    "owner": {
      <!-- id of a user object -->
    }
  }
  ```

- Minor modification on the trip collection schema to include a done boolean field and the vehicle field. The new schema is as follows:

  ```json
  {
    "departureLocation": "string",
    "departureTime": "date",
    "destinationLocation": "string",
    "destinationTime": "date",
    "date": "date",
    "seats": "number",
    "done": "boolean",
    "driver": {
      <!-- id of a user object -->
    },
    "passengers": [
      <!-- id of a user object -->
    ],
    "vehicle": {
      <!-- id of a vehicle object -->
    }
  }
  ```

- Created the work log file.
- Modified the db_init.js file to include the new changes in the schemas.
- Renamed the Ecocovoit folder to EcocovoitApp.
- Minor correction due to a bug with bcrypt, switched to bcryptjs.
- Added the bcryptjs package to the project.
- Added the vehicle collection to the db_init.js file.
- Added the vehicle.js file to the routes folder.
- Added the vehicle routes to the app.js file.
- Integration of a Swagger documentation for the API.

### Joseph
