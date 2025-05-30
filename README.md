# Node.js Backend API

A simple backend REST API built with Node.js and Express. It supports user authentication using JWT, and includes basic account operations like registration, login, and money transfers. Data is temporarily stored in JSON files.

## Features

- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Account data stored in JSON files
- Money transfer between users
- Basic error handling and validation

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (Node package manager)

### Installation

**1. Clone the repository:**

```
git clone https://github.com/kxight/optimal_flow_exercise.git
cd optimal_flow_exerise 
```

**2. Install dependencies:**
```
npm install
```

**3. create .env file with these data**
```
// this is a mock data, replace it with your data
PORT=3000

JWT_SECRET=your_secret
JWT_EXPIRY=3d

COOKIE_TIME=3
```
**4. run the server:**
```
npm run start
```
Server will run on http://localhost:3000 (or your port that you set in .env)

## API Endpoints

### Authentication

- `POST /users` sign up 

body: 
``` 
{
    "username" : "test",
    "email" : "test@email.com",
    "password" : "1234"
}
```

- `POST /login` login 

body: 
``` 
{
    "email" : "test@email.com",
    "password" : "1234"
}
```

### Users

- `GET /users` get all users

- `GET /users/:id` get user by id

### Transfer

- `POST /transfer` transfer money  **this api need to authenticate*

header:

``` 
  "Authorization": "Bearer the_token_that_get_when_log_in",
```

body:
``` 
{
  "from_user_id": "uuid123",
  "to_user_id": "uuid456",
  "amount": 50,
  "note": " a gift for you <3"
}
```
## Postman
[Click to Run in Postman](https://www.postman.com/telecoms-participant-33358043/public/collection/f1rqoln/optimal-flow-exercise?share=true) to test the API.

## Design Concept

### Architecture and Code Structure

This project follows the MVC (Model-View-Controller) architecture

### Data Structure
The application manages three main types of data:

- **User** – Represents a registered user of the system.

- **Account** – Each user has their own account used for transactions.

- **Transaction** – Every time money is transferred in or out, a transaction record is created.

All data is stored in JSON files, and managed through .store files, which are responsible for reading and writing data.

### Component Breakdown
- **routes:** Define the API endpoints and map them to their corresponding controller functions. Each route file groups related paths (e.g., authentication, account) to keep the code organized.

- **controllers** Handle the incoming request and response objects. Controllers validate input, handle basic logic, and delegate core processing to services.

- **.store files:** Handle data access – reading from and writing to JSON files.

- **services:** Contain business logic and interact with .store files to perform operations like registration, login, or money transfers.

- **models:** Define the object schemas for User, Account, and Transaction, ensuring consistent data structure.

- **utils:** Include helper functions or utilities used across the application.

- **middleware:** Includes components like JWT authentication that run before controllers handle requests.

## Technologies Used

- Node.js
- Express.js
- bcrypt
- JSON Web Tokens (JWT)
- UUID for unique user IDs
- File system (fs module) for data persistence
