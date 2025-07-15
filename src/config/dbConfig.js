require("dotenv").config();
const mongoose = require("mongoose");
const mysql = require("mysql2");
const { Client } = require("pg");
const sqlite3 = require("sqlite3").verbose();


const connectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    }
    catch(error){
            console.error("MongoDB Connecion Error:",error);
    }
}

const connectMySQL = () => {
    return mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
    });
};


module.exports = { connectMongoDB,connectMySQL };