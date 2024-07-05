const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Devserver123@",
    database: "myappdb"
});

module.exports = connection