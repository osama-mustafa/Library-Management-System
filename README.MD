## About 

A library management system facilitates the borrowing and returning of books by users. Users typically create accounts within the system, allowing them to search for available books, request to borrow them, and return them when finished. Administrators have additional privileges, such as managing the library's catalog, adding new books, and overseeing borrowing activities.

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
