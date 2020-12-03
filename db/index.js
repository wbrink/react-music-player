const mysql = require("mysql");

let options = {
    connectionLimit: 10,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}


const pool = mysql.createPool(options);


module.exports = pool;