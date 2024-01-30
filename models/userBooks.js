const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user');
const Book = require('./book');

const UserBook = sequelize.define('UserBook', {
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
        defaultValue: Date.now,
        allowNull: false,
    },
    dueDate: {
        type: DataTypes.DATE,
        defaultValue: () => new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        allowNull: false,
    },
    returnDate: {
        type: DataTypes.DATE,
        defaultValue: null
    }
}, {
    timestamps: false,
    tableName: 'userBooks'
});

// UserBook.belongsTo(User, { foreignKey: 'userId' });
// UserBook.belongsTo(Book, { foreignKey: 'bookId' });

User.belongsToMany(Book, { through: UserBook });
Book.belongsToMany(User, { through: UserBook });

// Create users table using model synchronization
UserBook.sync()
    .then()
    .catch((error) => {
        console.log(`Cannot create userBooks Table => ${error}`);
    });

module.exports = UserBook;