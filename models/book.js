const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Author = require('./author');

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Author,
            key: 'id'
        }
    },
    ISBN: {
        type: DataTypes.STRING,
        allowNull: false
    },
    availableCopies: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    shelfLocation: {
        type: DataTypes.CHAR,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'books'
});


// // Create books table using model synchronization
// Book.sync()
//     .then()
//     .catch((error) => {
//         console.log(`Cannot create books table: ${error}`)
//     });

module.exports = Book;