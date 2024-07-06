const express =  require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const db =  require("./db/db");
const actions = require("./routes/auth");
const manageProducts = require("./routes/productRoutes")


const PORT = process.env.PORT || 5000
const app = express();
app.use(bodyparser.json());
app.use(cors());
app.use("/auth", actions);
app.use("/", manageProducts)

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