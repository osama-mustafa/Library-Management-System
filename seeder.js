const fs = require('node:fs/promises');
const userSeederFile = `${__dirname}/_data/users.json`;
const authorSeederFile = `${__dirname}/_data/authors.json`;
const User = require('./models/user');
const Author = require('./models/author');
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
        const userData = await readDataFromFile(userSeederFile);
        const authorData = await readDataFromFile(authorSeederFile);

        await sequelize.sync({ force: true });
        await User.bulkCreate(userData, {
            individualHooks: true
        });
        await Author.bulkCreate(authorData);

        console.log('Data imported successfully');
    } catch (err) {
        console.log(err);
    }
}

const deleteData = async () => {
    try {
        await sequelize.drop();
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