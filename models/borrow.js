const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user');
const Book = require('./book');

const Borrow = sequelize.define('Borrow', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    BookId: {
        type: DataTypes.INTEGER,
        references: {
            model: Book,
            key: Book.id,
        }
    },
    UserId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: User.id,
        }
    },
    checkoutDate: {
        type: DataTypes.DATE,
        defaultValue: () => new Date(),
        allowNull: false,
    },
    dueDate: {
        type: DataTypes.DATE,
        defaultValue: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        allowNull: false,
    },
    returnDate: {
        type: DataTypes.DATE,
        defaultValue: null
    }
}, {
    timestamps: false,
    tableName: 'borrows'
});

Borrow.prototype.isAuthUserBorrowedThisBook = function (userId) {
    return this.UserId === userId
}

User.belongsToMany(Book, { through: Borrow });
Book.belongsToMany(User, { through: Borrow });

module.exports = Borrow;