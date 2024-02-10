const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Author = require('./author');
const messages = require('../utils/messages');

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
    AuthorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Author,
            key: Author.id
        }
    },
    ISBN: {
        type: DataTypes.STRING,
        allowNull: false
    },
    availableCopies: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: 0,
                msg: messages.error.AVAILABLE_BOOKS_GREATER_THAN_ZERO
            }
        }
    },
    shelfLocation: {
        type: DataTypes.CHAR,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: 'books',
    defaultScope: {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    }
});

Author.hasMany(Book);

Book.prototype.isBookAvailable = function () {
    return this.availableCopies >= 1;
}

module.exports = Book;