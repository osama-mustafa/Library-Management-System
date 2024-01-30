const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user');
const Book = require('./book');

const Checkout = sequelize.define('Checkout', {
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
    tableName: 'checkouts'
});

User.belongsToMany(Book, { through: Checkout });
Book.belongsToMany(User, { through: Checkout });

Checkout.sync()
    .then()
    .catch((error) => {
        console.log(`Cannot create checkouts Table => ${error}`);
    });

module.exports = Checkout;