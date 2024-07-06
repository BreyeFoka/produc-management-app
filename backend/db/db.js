require('dotenv').config();

const mysql = require("mysql");

const DBHOST = process.env.DBHOST || "localhost";
const PWD = process.env.DBPWD;
const DBNAME = process.env.DBNAME || "myappdb";
const DBUSER = process.env.DBUSER || "root";

const connection = mysql.createConnection({
    host: DBHOST,
    user: DBUSER,
    password: PWD,
    database: DBNAME
});

module.exports = connection