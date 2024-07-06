const express = require("express");
const mysql = require("mysql");
const db = require("../db/db");
const bcrypt = require("bcryptjs")
const router = express.Router();
const jwt = require("jsonwebtoken")


const JWT = "975022f2e8ef2aaef6fd660600627b95e7e6b19e4a7c26070bf6b2e7779ec7454536044ebdf3969049ede12728272894a94fdb6b2d828ad9a455cce3d0b29cb5"


const auth = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
  
    jwt.verify(token, JWT, (err, decoded) => {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
  
      req.userId = decoded.id;
      next();
    });
};

router.post("/register", (req, res) => {
    const { first_name, last_name, username, password } = req.body;
    const checkUserQuery = `SELECT * FROM users WHERE username = ?`;
    db.query(checkUserQuery, [username], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const hashedPassword = bcrypt.hashSync(password, 8);
        const query = `INSERT INTO users (last_name, first_name, username, password) VALUES (?, ?, ?, ?)`;
        db.query(query, [last_name, first_name, username, hashedPassword], (err, result) => {
            if (err) throw err;
            const token = jwt.sign({ id: result.insertId }, JWT, { expiresIn: 86400 });
            res.status(200).send({ auth: true, token: token });
        });
    });
});


router.get("/login", (req, res) => {
    const {username, password} = req.body;
    const query = `SELECT * FROM users WHERE username = ?`;
    db.query(query, [username], (err, result)=>{
        if(err) throw err;
        if(result.length > 0){
            const IsMatch = bcrypt.compareSync(password, result[0].password)
            if(!IsMatch){
                return res.json({message: "Invalid email or password"})
            } else{
                
                const token = jwt.sign({id: result[0].id}, JWT, {expiresIn: 86400})
                res.json({auth: true, token: token})
            }
        }else{
            res.json({message: "Invalid email or password"})
        }
        res.json(result)
    })

})

router.get("/products",auth ,  (req, res) => {
    const query  = "SELECT * FROM products";
    db.query(query, (err, result)=>{
        if(err) throw err;
        res.json(result)
    }) 
})

router.get("/products/:id", auth, (req, res) => {
    const  {Id} = req.params;
    const query = `SELECT * FROM products WHERE id = ?`;
    db.query(query, [Id], (err, result)=>{
        if(err) throw err;
        res.json(result)
    })

})

router.post("/products", auth, (req, res) => {
    const {product_name, product_description, product_price} = req.body;

    const query = `INSERT INTO products (product_name, product_description, product_price) VALUES (?, ?, ?)`;
    db.query(query, [product_name, product_description, product_price], (err, result)=>{
        if(err) throw err;
        res.json(result)
    })
 })
 
 router.put("/products/:id", auth,  (req, res) => {
    const {product_name, product_description, product_price} = req.body;
    const {Id} = req.params;
    const query = `UPDATE products SET product_name = ?, product_description = ?, product_price = ? WHERE id = ?`;
    db.query(query, [product_name, product_description, product_price, Id], (err, result)=>{
        if(err) throw err;
        res.json(result)
    })
 })

 router.delete("/products/:id", auth, (req, res) => {
    const {Id} = req.params;
    const query = `DELETE FROM products WHERE id = ?`;
    db.query(query, [Id], (err, result)=>{
        if(err) throw err;
        res.json(result)
    })
 })




module.exports = router