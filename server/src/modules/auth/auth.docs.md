# User Authentication Docs

---

# Log In
​
User can acces his account
​
## How to use this API
​
### this is the base URL
​
```bash
/api/auth/login
```
### Register an user
​
### Method: `POST`
​
You need to send a JSON with this structure
​
```json
{
  "username": "username",
  "password": "username"
}
```
​
### Response: code `200 OK`
​
### In a valid request, it retunrns a accessToken
​
```json
{
  "accessToken": "accesTokenExample"
}
```
​
## Errors
​
### 1. If the username or password are invalid
​
### Response: code `401 Unauthorized`
```json
{
  "errors": [
    "Credenciales incorrectas"
  ]
}
```

---

# Sign Up 

User can Sign Up into the system 

## How to use this API

### this is the base URL

```bash
/api/auth/register
```
### Register an user

### Method: `POST`

You need to send a JSON with this structure
```json
{
	"username": "username",
	"first_name": "First name",
	"last_name": "lastname",
	"email": "email@email.com",
	"password": "123"
}
```

- The username must be unique in each register
- the password must be at least 6 characters long
- You have to put a valid email syntax

### Response: code `201 Created`

### In a valid request, it retunrns a accessToken

```json
{
	"accessToken": "accesTokenExample"
}
```

## Errors

### 1. If the username or email already exisst

### Response: code `400 Bad Request`
```json
{
	"errors": [
		{
			"message": "Bad Request"
		}
	]
}
```

### 2. If the password, the firstname or lastname are too shoorts, or the email is not valid

### Response: code `400 Bad Request`
```json
{
	"errors": [
		"el nombre debe tener al menos 3 caracteres",
		"el email debe ser válido",
		"la contraseña debe tener al menos 6 caracteres"
	]
}
```
---

# Log Out

this end point closes user session

## How to use it

### Base URL
```bash
/api/auth/logout/
```

### Method: `POST`

### Response: code `204 No Content`
