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
<<<<<<< HEAD

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


## Captain Routes

### POST /captains/register

Registers a new captain account and creates their vehicle record.

#### Request Body
```jsonc
{
  "fullname": {
    "firstname": "Jane", // required, minimum 3 characters
    "lastname": "Rider" // required, minimum 3 characters
  },
  "email": "jane@example.com", // required, must be a valid email address
  "password": "securePass", // required, minimum 6 characters
  "vehicle": {
    "color": "red", // required, minimum 3 characters
    "plate": "ABC123", // required, minimum 3 characters
    "capacity": 4, // required, integer, minimum 1
    "vehicleType": "car" // required, must be one of: car, motorcycle, auto
  }
}
```

#### Success Response
Status: `201 Created`

```jsonc
{
  "token": "<jwt-token>",
  "captain": {
    "_id": "<captain-id>",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Rider"
    },
    "email": "jane@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

#### Error Responses
- `400 Bad Request` for validation failures or duplicate email
- `500 Internal Server Error` for unexpected server errors

---

### POST /captains/login

Authenticates an existing captain and returns a JWT.

#### Request Body
```jsonc
{
  "email": "jane@example.com", // required, must be a valid email address
  "password": "securePass" // required, minimum 6 characters
}
```

#### Success Response
Status: `200 OK`

```jsonc
{
  "token": "<jwt-token>",
  "captain": {
    "_id": "<captain-id>",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Rider"
    },
    "email": "jane@example.com"
  }
}
```

#### Error Responses
- `400 Bad Request` for validation failures
- `400 Bad Request` when the email or password is invalid

---

### GET /captains/profile

Returns the authenticated captain profile.

#### Request
```http
GET /captains/profile
Authorization: Bearer <token>
```

#### Success Response
Status: `200 OK`

```jsonc
{
  "captain": {
    "_id": "<captain-id>",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Rider"
    },
    "email": "jane@example.com"
  }
}
```

#### Error Responses
- `401 Unauthorized` when no valid token is provided

---

### GET /captains/logout

Logs out the authenticated captain.

#### Request
```http
GET /captains/logout
Authorization: Bearer <token>
```

#### Success Response
Status: `200 OK`

```jsonc
{
  "message": "Logout Sucessfull"
}
```

#### Error Responses
- `401 Unauthorized` when no valid token is provided

### Notes
- Passwords are hashed before being stored.
- A JWT is generated for successful register and login requests.
- The captain routes are implemented in [backend/routes/captain.route.js](backend/routes/captain.route.js).


# Get Fare Endpoint

## GET /rides/get-fare

Calculates an estimated fare for a ride between a pickup location and a destination.

### Description
This endpoint requires an authenticated user and uses the map service to estimate distance and travel time before returning fare estimates for the supported vehicle types.

### Authentication
- Requires a valid JWT token.
- The token can be provided via the `Authorization` header as a Bearer token or through the `token` cookie.

### Query Parameters
- `pickup` (string, required): pickup address; must be at least 3 characters long
- `destination` (string, required): destination address; must be at least 3 characters long

### Example Request
```http
GET /rides/get-fare?pickup=Delhi&destination=Gurgaon
```

### Success Response
- **Status Code:** `200 OK`
- **Example Response:**
```json
{
  "auto": 125.5,
  "car": 185.25,
  "motorcycle": 82.3
}
```

### Error Responses
- **Status Code:** `400 Bad Request`
  - Returned when the pickup or destination query parameters are missing or invalid.
  - Example response:
```json
{
  "errors": [
    {
      "msg": "Invalid Pickup Address"
    }
  ]
}
```

- **Status Code:** `500 Internal Server Error`
  - Returned when fare calculation fails.
  - Example response:
```json
{
  "message": "Pickup and destination are required"
}
```

### Notes
- The fare is estimated using route distance and travel duration.
- Returned values are numeric estimates for `auto`, `car`, and `motorcycle`.

