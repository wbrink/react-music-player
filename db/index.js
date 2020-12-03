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



// added promises to the query so that it can be used with promise chaining or async await

// const mysql = require("mysql");

// let options = {
//     connectionLimit: 10,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE
// }

// const pool = mysql.createPool(options);

// const query = (sql, values) => {
//     return new Promise((resolve, reject) => {
//         pool.query(sql, values, (error, results, fields) => {
//             if (error) {
//                 reject(error);
//             }
//             resolve(results);
//         })
//     })
// }

    


// module.exports = query;


