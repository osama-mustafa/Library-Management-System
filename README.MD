## How to run the project

- Create your .env file from .env.example with your MySQL database credentials
- Run the command "npm install" to install project dependencies
- Run the command "node seeder -i" to seed dummy data
- Run the command "npm run dev" for starting the server
- Login with admin privileges
  - email: admin@example.com
  - password: admin
- Login with librarian privileges
  - email: librarian@example.com
  - password: librarian

## Project Features

1. Books
  - Add a book with details like title, author, ISBN, available quantity, and shelf location.
  - Update a book’s details
  - Delete a book
  - List all books
  - Search for a book by title or ISBN

2. Borrowing Process
  - A borrower can check out a book. The system should keep track of which books are
checked out and by whom.
  - A borrower can return a book.
  - A borrower can check the books they currently have in his profile.
  - The system keep track of due dates for the books and list books that are
overdue
