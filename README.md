### Personal-Notes Hub - Frontend

### Overview

PersonalNotesHub is a digital platform designed for individuals to organize and manage their personal notes effortlessly.

### Features

1. User Authentication: Allows users to register and login securely.
2. Note Management: Users can create, edit, categorize, search, and delete notes.
3. Category Management: Users can add, edit, and delete note categories.

### Tech Stack

- Frontend: React
- Backend: Express
- Database: MySQL
- Client Libraries: React, React Router, Axios
- Server Libraries: Knex, Express, Bcrypt, JSONWebtoken

### Implementation

### Frontend

- The frontend of PersonalNotesHub is built using React, providing a dynamic and responsive user interface. The app utilizes React Router for navigation and Axios for making HTTP requests to the backend API.

### Backend

- The backend of PersonalNotesHub is built using Express, a web application framework for Node.js. It interacts with the MySQL database using Knex, a SQL query builder. Bcrypt is used for password hashing, and JSONWebtoken is used for

### Getting Started

To run PersonalNotesHub locally, follow these steps:

1. Clone the repository.
2. Install dependencies: npm install.
3. Set up the database: [instructions here].
   1. Install MYSQL
   2. Add credentials to env file
   3. Run migration `npx knex migate:up`
4. Start the backend server: npm start.
5. Start the frontend development server: npm start.

#### sample env

```ini
PORT=1010
CLIENT_URL=http://localhost:3000
JWT_SECRET=9f1df7856ef9ba915e2f893ec604634107366427d1597498231fcd6ca65b4a33
# use any secret to sign jwt tokens
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=rootroot
DB_DATABASE=personal_note_hub
```

### API Endpoints

- POST /auth/signup: Register a new user.
- POST /auth/login: Login a user.
- GET /notes: Get a list of notes.
- GET /notes/category/:id: Get notes by category.
- POST /notes: Add a new note.
- PUT /notes/:id: Update a note.
- DELETE /notes/:id: Delete a note.
- POST /category: Add a new category.
- PUT /category/:id: Update a category.
