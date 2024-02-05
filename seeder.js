const fs = require('node:fs/promises');
const userSeederFile = `${__dirname}/_data/users.json`;
const authorSeederFile = `${__dirname}/_data/authors.json`;
const bookSeederFile = `${__dirname}/_data/books.json`;
const borrowSeederFile = `${__dirname}/_data/borrows.json`;
const User = require('./models/user');
const Author = require('./models/author');
const Book = require('./models/book');
const Borrow = require('./models/borrow');
require('dotenv').config();
const { connectDB, sequelize } = require('./config/db');

const readDataFromFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, { encoding: 'utf8' });
        return JSON.parse(data);
    } catch (error) {
        console.log(error)
        throw error
    }
}

connectDB();
const seedData = async () => {
    try {
        const users = await readDataFromFile(userSeederFile);
        const authors = await readDataFromFile(authorSeederFile);
        const books = await readDataFromFile(bookSeederFile);
        const borrows = await readDataFromFile(borrowSeederFile);

        await sequelize.sync({ force: true });
        await User.bulkCreate(users, { individualHooks: true });
        await Author.bulkCreate(authors);
        await Book.bulkCreate(books);
        await Borrow.bulkCreate(borrows);

        console.log('Data imported successfully');
    } catch (err) {
        console.log(err);
    }
}

const deleteData = async () => {
    try {
        // await sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null);
        await sequelize.drop();
        // await sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null);

        console.log('Data destoryed successfully');
    } catch (error) {
        console.log(error);
    }
}

if (process.argv[2] === '-i') {
    seedData();
} else if (process.argv[2] == '-d') {
    deleteData();
}