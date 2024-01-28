const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

const connectDB = async () => {
    try {
        connection.connect();
        console.log('MySQL DB Connected')
    } catch (error) {
        console.log(error);
        throw error;
    }
}


module.exports = connectDB