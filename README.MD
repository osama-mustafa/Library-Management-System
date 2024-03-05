## About

A library management API back-end system facilitates the borrowing and returning of books by users. Users typically create accounts within the system, allowing them to search for available books, request to borrow them, and return them when finished. Administrators have additional privileges, such as managing the books, authors, and overseeing borrowing activities.

## Tech Features
- API Documentation
- API Rate Limiting
- RESTful Routing
- JWT-Based, Stateless Authentication
- Error Handling
- Proper Status Codes
- Response Formatting
- Full Authentication System (Register, Login, Logout, Fogort Password, Reset Password)
- Pagination, Sorting & Filtering for Data
- Roles (Admin, Librarian, and User)
- Dockerized Application

## Business Features
- Books: create, edit, delete, get available books, and show with related author & genre
- Genres: create, edit, delete, get all genres
- Authors: create, edit, delete, get all authors
- Borrowing: borrow, return, renew borrowing, manage overdue books

## Getting Started

### Way One
- Clone the project
- Create your .env file from .env.example with your MySQL database credentials
- First you need MySQL to be installed in your machine via e.g. [XAMPP](https://www.apachefriends.org/download.html)
- Opeb MySQL & create new empty database called `library_system`
- Run the command `npm install` to install project dependencies
- Run the command `npm run dev` for starting the server
- In new terminal, run the command `node seeder -i` to seed dummy data


### Way Two (Using Docker)
- Clone the project 
- Create your .env file from .env.example with the same file data
- Run the command `docker-compose up -d` to dockerize the application
- After dockerization process finished, In a new terminal run `docker exec -it my_app sh`
- In the prvious terminal, run the command `node seeder -i` to migrate tables & seed dummy data
- Then run the command `exit` to exit from this terminal

## Getting Deep
After seeding the dummy data to the project 
- Login with admin privileges
  - email: `admin@example.com`
  - password: `admin`
- Login with librarian privileges
  - email: `librarian@example.com`
  - password: `librarian`
- Login with regular user
  - email: `test@example.com`
  - password: `test`


