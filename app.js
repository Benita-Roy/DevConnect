const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
console.log("MONGO_URI:", process.env.MONGO_URI ? "Loaded" : "Not loaded");

connectDB();

app.get("/",(req,res)=>{
    res.send("API is running...");
});

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
