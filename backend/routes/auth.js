const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db/db");
const bcrypt = require("bcryptjs")

const authroutes = express.Router();
const JWT = process.env.JWT

authroutes.post("/register", (req, res) => {
    const { firstname, lastname, username, password } = req.body;
    const checkUserQuery = `SELECT * FROM users WHERE username = ?`;
    db.query(checkUserQuery, [username], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const hashedPassword = bcrypt.hashSync(password, 8);
        const query = `INSERT INTO users (lastname, firstname, username, password) VALUES (?, ?, ?, ?)`;
        db.query(query, [lastname, firstname, username, hashedPassword], (err, result) => {
            if (err) throw err;
            const token = jwt.sign({ id: result.insertId }, JWT, { expiresIn: 86400 });
            res.status(200).send({ auth: true, token: token });
        });
    });
});


authroutes.post("/login", (req, res) => {
    const {username, password} = req.body;
    const query = `SELECT * FROM users WHERE username = ?`;
    db.query(query, [username], (err, result) => {
        if (err) return res.status(500).send(err); 

        if (result.length > 0) {
            const isMatch = bcrypt.compareSync(password, result[0].password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid email or password" }); 
            } else {
                const token = jwt.sign({ id: result[0].id }, JWT, { expiresIn: 86400 });
                return res.json({ auth: true, token: token }); 
            }
        } else {
            return res.status(401).json({ message: "Invalid email or password" }); 
        }
    });

})

module.exports = authroutes
