## About

A library management system facilitates the borrowing and returning of books by users. Users typically create accounts within the system, allowing them to search for available books, request to borrow them, and return them when finished. Administrators have additional privileges, such as managing the library's catalog, adding new books, and overseeing borrowing activities.

## How to run the project

- Create your .env file from .env.example with your MySQL database credentials
- Run the command `npm install` to install project dependencies
- Run the command `npm run dev` for starting the server
- In new terminal, run the command `node seeder -i` to seed dummy data
- Login with admin privileges
  - email: admin@example.com
  - password: admin
- Login with librarian privileges
  - email: librarian@example.com
  - password: librarian
- Login with regular user
  - email: test@example.com
  - password: test

## System Permissions

- Admin
  - Full privilages for the system
- Librarian
  - Books
  - Authors
  - Genres
- User
  - Borrow book
  - Return book
  - Show borrow history
  - Edit profile

## Key Features

- Books

  - Create book
  - Edit book
  - Delete book
  - List all books
  - List available books that have available copies
  - Search books with title or ISBN
  - Show book with associated genre & author

- Genres

  - Create genre
  - Edit genre
  - Delete genre
  - List all genres
  - Show genre with associated books

- Authors

  - Create author
  - Edit author
  - Delete author
  - List all authors
  - Show author with associated books

- Borrowing

  - Borrow book
  - return book
  - Get overdue book
  - Get all borrowers
  - Renew borrow process if borrowed before

- Users

  - Create user
  - Edit user
  - Delete user
  - List all users
  - Show user with associated borrowed books
