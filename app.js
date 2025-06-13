const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes=require("./routes/authRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/auth", authRoutes);
connectDB();

app.get("/",(req,res)=>{
    res.send("API is running...");
});

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
