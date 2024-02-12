const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Author = require('./author');
const messages = require('../utils/messages');
const Genre = require('./genre');

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
    ISBN: {
        type: DataTypes.STRING,
        allowNull: false
    },
    availableCopies: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: [1],
                msg: messages.error.AVAILABLE_BOOKS_GREATER_THAN_ZERO
            }
        }
    },
    shelfLocation: {
        type: DataTypes.CHAR,
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
    GenreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Genre,
            key: Genre.id
        }
    },
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
Genre.hasMany(Book);
Book.belongsTo(Author);
Book.belongsTo(Genre);

Book.prototype.isBookAvailable = function () {
    return this.availableCopies >= 1;
}

module.exports = Book;