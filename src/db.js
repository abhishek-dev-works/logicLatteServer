const mysql = require('mysql2');

// Create a connection to the database
const pool = mysql.createPool({
    host: '127.0.0.1', //
    user: 'root', // Your MySQL database username
    password: '@Bhishek1122', // Your MySQL database password
    database: 'logic_latte', // Your MySQL database name
}).promise();

const get = async() => { 
    const [result] = await pool.query("select * from users");
    console.log(result)
}

get();

module.exports = pool;
