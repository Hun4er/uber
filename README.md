# User Registration Endpoint

## POST /users/register

Registers a new user account.

### Description
This endpoint creates a new user with the provided personal details and returns a JSON Web Token (JWT) along with the newly created user data.

### Request Body
The request body must be sent as JSON and include the following fields:

- `fullname` (object, required)
  - `firstname` (string, required): must be at least 3 characters long
  - `lastname` (string, optional): must be at least 3 characters long if provided
- `email` (string, required): must be a valid email address
- `password` (string, required): must be at least 6 characters long

### Example Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response
- **Status Code:** `201 Created`
- **Example Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.exampleSignature",
  "user": {
    "_id": "64f8b2a1c9d0e1234567890a",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com"
  }
}
```

### Error Responses
- **Status Code:** `400 Bad Request`
  - Returned when validation fails or required fields are missing.
  - Example response:
```json
{
  "errors": [
    {
      "msg": "Invalid Email"
    }
  ]
}
```

### Notes
- The password is hashed before being stored.
- A JWT is generated for the newly created user.

