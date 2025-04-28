# School Management API

A Node.js API for managing school data with location-based searching capabilities.

## Features

- Add new schools with name, address, and geographic coordinates
- List schools sorted by proximity to a specified location
- Input validation
- Error handling
- MySQL database integration

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- MySQL server

### Installation

1. Clone the repository

```bash
git clone https://github.com/your-username/school-management-api.git
cd school-management-api
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables

Create a `.env` file in the root directory and add the following:

```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=school_management
DB_PORT=3306
PORT=3000
```

4. Start the server

```bash
npm start
```

For development:

```bash
npm run dev
```

## API Documentation

### Add School

**Endpoint:** `POST /api/addSchool`

**Request Body:**
```json
{
  "name": "Example School",
  "address": "123 Education St, City",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

**Response:**
```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Example School",
    "address": "123 Education St, City",
    "latitude": 40.7128,
    "longitude": -74.0060
  }
}
```

### List Schools by Proximity

**Endpoint:** `GET /api/listSchools?latitude=40.7128&longitude=-74.0060`

**Query Parameters:**
- `latitude`: User's latitude (required)
- `longitude`: User's longitude (required)

**Response:**
```json
{
  "success": true,
  "message": "Schools retrieved successfully",
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Example School",
      "address": "123 Education St, City",
      "latitude": 40.7128,
      "longitude": -74.0060,
      "distance": 0.00
    },
    {
      "id": 2,
      "name": "Another School",
      "address": "456 Learning Ave, Town",
      "latitude": 40.7589,
      "longitude": -73.9851,
      "distance": 5.23
    }
  ]
}
```

## Postman Collection

A Postman collection is available in the `docs` folder for testing the API.

## How Distance Calculation Works

The API uses the Haversine formula to calculate the distance between two geographic coordinates. This formula determines the great-circle distance between two points on a sphere given their longitudes and latitudes.

## Error Handling

The API includes comprehensive error handling with appropriate HTTP status codes and error messages.

## License

This project is licensed under the MIT License - see the LICENSE file for details.