# Test Manual for Control and Vulnerability

## Initial Configuration

1. **Server Base URL for Vulnerability**: `http://localhost:3000/api/vulnerability`
2. **Server Base URL for Control**: `http://localhost:3000/api/control`
3. **Application used for testing**: Postman
4. **Data format**: JSON
5. **Dependencies**:
   - The Control model must be registered before creating a Vulnerability.

## Tests for Control Module

### 1. Create Control (POST)

**Description**: This endpoint allows the creation of a new control.  
**Endpoint**: `api/control`  
**Method**: `POST`  
**Body**:
{
  "code": 101,
  "description_iso": "ISO description example",
  "description_city_hall": "City hall description example"
}

**Expected Response (201)**:
{
  "id": 1,
  "code": 101,
  "description_iso": "ISO description example",
  "description_city_hall": "City hall description example"
}

**Errors**:
- 409 Conflict: If the code already exists.
- 400 Bad Request: If required fields are missing.

### 2. Get All Controls (GET)

**Description**: Retrieves the list of all controls.  
**Endpoint**: `api/control`  
**Method**: `GET`

**Expected Response (200)**:
[
  {
    "id": 1,
    "code": 101,
    "description_iso": "ISO description example",
    "description_city_hall": "City hall description example"
  }
]

### 3. Get Control by ID (GET)

**Description**: Retrieves a specific control by its ID.  
**Endpoint**: `api/control/{id}`  
**Method**: `GET`  
**Parameters**: `{id}` must be the control ID.

**Expected Response (200)**:
{
  "id": 1,
  "code": 101,
  "description_iso": "ISO description example",
  "description_city_hall": "City hall description example"
}

**Errors**:
- 404 Not Found: If the control does not exist.

### 4. Update Control by ID (PUT)

**Description**: Updates an existing control.  
**Endpoint**: `api/control/{id}`  
**Method**: `PUT`  
**Parameters**: `{id}` of the control.  
**Body**:
{
  "description_iso": "Updated ISO description",
  "description_city_hall": "Updated city hall description"
}

**Expected Response (200)**:
{
  "id": 1,
  "code": 101,
  "description_iso": "Updated ISO description",
  "description_city_hall": "Updated city hall description"
}

**Errors**:
- 404 Not Found: If the control does not exist.

### 5. Delete Control by ID (DELETE)

**Description**: Deletes a control by its ID.  
**Endpoint**: `api/control/{id}`  
**Method**: `DELETE`  
**Parameters**: `{id}` of the control.

**Expected Response (200)**:
{
  "message": "Control deleted successfully"
}

**Errors**:
- 404 Not Found: If the control does not exist.

## Tests for Vulnerability Module

### 1. Create Vulnerability (POST)

**Description**: Creates a new vulnerability associated with a control.  
**Endpoint**: `api/vulnerability`  
**Method**: `POST`  
**Note**: The `control_code` must be an existing code in the Control table.  
**Body**:
{
  "control_code": 101,
  "name": "Example vulnerability",
  "description": "Vulnerability description"
}

**Expected Response (201)**:
{
  "id": 1,
  "control_code": 101,
  "name": "Example vulnerability",
  "description": "Vulnerability description"
}

**Errors**:
- 404 Not Found: If the `control_code` does not exist.
- 400 Bad Request: If required fields are missing.

### 2. Get All Vulnerabilities (GET)

**Description**: Retrieves all vulnerabilities, including their associated control.  
**Endpoint**: `api/vulnerability`  
**Method**: `GET`

**Expected Response (200)**:
[
  {
    "id": 1,
    "control_code": 101,
    "name": "Example vulnerability",
    "description": "Vulnerability description",
    "code": {
      "id": 1,
      "code": 101,
      "description_iso": "ISO description example",
      "description_city_hall": "City hall description example"
    }
  }
]
