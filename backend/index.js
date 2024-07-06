const express =  require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const db =  require("./db/db");
const sql = require("mysql");
const actions = require("./routes/routes")


const PORT = process.env.PORT || 5000
const app = express();
app.use(bodyparser.json());
app.use(cors());
app.use("/", actions);

db.connect((err)=>{
    if(err){
        console.log(err);
        throw err;
    } 
    console.log("Datbase Connected");
})

app.listen(PORT, ()=>{
    console.log(`Server Running on port ${PORT}`);
})