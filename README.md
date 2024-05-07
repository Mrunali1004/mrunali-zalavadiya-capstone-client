### Personal-Notes Hub - Frontend

### Overview

PersonalNotesHub is a digital platform designed for individuals to organize and manage their personal notes effortlessly.

### Features

1. User Authentication: Allows users to register and login securely.
2. Note Management: Users can create, edit, categorize, search, and delete notes.
3. Category Management: Users can add, edit, and delete note categories.

### Tech Stack

This section should list any major frameworks/libraries used to bootstrap my project. Here are a few examples.

- Frontend: React
- Backend: Express
- Database: MySQL
- Client Libraries: React, React Router, Axios
- Server Libraries: Knex, Express, Bcrypt, JSONWebtoken
- Enhanced Notes Editor: Implement Markdown support for  
  formatting notes.

### Implementation

### Frontend

- The frontend of PersonalNotesHub is built using React, providing a dynamic user interface. The app utilizes React Router for navigation and Axios for making HTTP requests to the backend API.

### Backend

- The backend of PersonalNotesHub is built using Express, a web application framework for Node.js. It interacts with the MySQL database using Knex, a SQL query builder. Bcrypt is used for password hashing, and JSONWebtoken is used for authentication.

### Getting Started

To run PersonalNotesHub locally, follow these steps:

1. Clone the repository.
2. Install dependencies: npm install.
3. Set up the database:
   1. Install MYSQL
   2. Add credentials to env file
   3. Run migration `knex migrate:latest`
4. Start the backend server: npm start.
5. Start the frontend development server: npm start.

#### sample env

```ini
PORT=1010
CLIENT_URL=http://localhost:3000
JWT_SECRET=
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

### Contributing

We welcome contributions to enhance PersonalNotesHub! If you'd like to contribute, please follow these steps:

1. Fork the repository to your own GitHub account.
2. Clone the repository to your local machine.

`git clone https://github.com/your-username/personal-notes-hub.git`

3. Create a new branch for your changes.

`git checkout -b feature/your-feature-name`

4. Make your changes and commit them to your branch.

`git add .`

`git commit -m "Add your feature or fix"`

5. Push your changes to your forked repository.

`git push origin feature/your-feature-name`

Please ensure your pull request adheres to the following guidelines:

Describe the purpose of your changes.
Keep the pull request focused on a single feature or fix.
Ensure any installed dependencies are properly documented if they are added or updated.
Test your changes thoroughly before submitting the pull request.
Thank you for your contribution to making PersonalNotesHub even better!

### Contact

For inquiries or support, please contact Mrunali Zalavadiya at [mrunalizalavadiya@email.com].
