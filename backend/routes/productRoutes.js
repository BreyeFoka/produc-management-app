const express = require("express");
const db = require("../db/db");
const auth = require("../middleware/auth")

const router = express.Router();

// Get all the products
router.get("/products", auth,  (req, res) => {
    const query  = "SELECT * FROM products";
    db.query(query, (err, result)=>{
        if(err) res.status(500).send(err);
        res.json(result)
    }) 
})

// get single product with Id
router.get("/products/:id", auth, (req, res) => {
    const  {id} = req.params;
    const query = `SELECT * FROM products WHERE id = ?`;
    db.query(query, [id], (err, result)=>{
        if(err) res.status(500).send(err);
        res.json(result)
    })

})

// Create new product
router.post("/products", auth, (req, res) => {
    const {name, description, price} = req.body;
    const query = `INSERT INTO products (name, description, price) VALUES (?, ?, ?)`;
    db.query(query, [name, description, price], (err, result)=>{
        if(err) res.status(500).send(err);
        res.json(result)
    })
 })
 
//  Update product
 router.put("/products/:id", auth,  (req, res) => {
    const {name, description, price} = req.body;
    const {id} = req.params;
    const query = `UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?`;
    db.query(query, [name, description, price, id], (err, result)=>{
        if(err) res.status(500).send(err);
        res.json(result)
    })
 })

//  Delete product
 router.delete("/products/:id", auth, (req, res) => {
    const {id} = req.params;
    const query = `DELETE FROM products WHERE id = ?`;
    db.query(query, [id], (err, result) => { 
        if (err) return res.status(500).send(err); 
        return res.json({ message: "Product deleted", result }); 
    });
 })

module.exports = router