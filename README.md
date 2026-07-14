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

---

# User Login Endpoint

## POST /users/login

Authenticates an existing user and returns a JSON Web Token (JWT) along with the authenticated user data.

### Description
This endpoint verifies the provided email and password, and returns a JWT if the credentials are valid.

### Request Body
The request body must be sent as JSON and include the following fields:

- `email` (string, required): must be a valid email address
- `password` (string, required): must be at least 6 characters long

### Example Request
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response
- **Status Code:** `200 OK`
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

- **Status Code:** `401 Unauthorized`
  - Returned when the email is not found or the password is incorrect.
  - Example response:
```json
{
  "message": "Invalid email or password"
}
```

### Notes
- The password is compared against the stored hashed password.
- A JWT is generated for the authenticated user.

---

# User Profile Endpoint

## GET /users/profile

Fetches the authenticated user's profile information.

### Description
This endpoint returns the profile data of the currently logged-in user. It requires a valid authentication token.

### Authentication
- Include a JWT in the `Authorization` header as a Bearer token.

### Example Request
```http
GET /users/profile
Authorization: Bearer <token>
```

### Success Response
- **Status Code:** `200 OK`
- **Example Response:**
```json
{
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
- **Status Code:** `401 Unauthorized`
  - Returned when no valid token is provided.
  - Example response:
```json
{
  "message": "Unauthorized"
}
```

### Notes
- This route is protected and only works for authenticated users.

---

# User Logout Endpoint

## GET /users/logout

Logs out the currently authenticated user.

### Description
This endpoint clears the authentication cookie or token state for the current user session.

### Authentication
- Include a JWT in the `Authorization` header as a Bearer token if required by your setup.

### Example Request
```http
GET /users/logout
Authorization: Bearer <token>
```

### Success Response
- **Status Code:** `200 OK`
- **Example Response:**
```json
{
  "message": "User logged out successfully"
}
```

### Error Responses
- **Status Code:** `401 Unauthorized`
  - Returned when no valid authentication is present.
  - Example response:
```json
{
  "message": "Unauthorized"
}
```

### Notes
- This endpoint is used to end the current user session.
