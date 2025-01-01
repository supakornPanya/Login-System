const express = require("express"); //import express
const bodyParser = require("body-parser"); //for get value from body in html
const mysql = require("mysql2/promise"); //import sql
const cors = require("cors");
const router = require("./routes/mainRoutes")

const app = express(); //varible of working with express
app.use(bodyParser.json());
app.use(cors());
 
//initail connection database
let conn = null;
const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", 
    database: "study",
    port: 8889, 
  });
};

// Middleware to inject the database connection into requests
app.use((req, res, next) => {
  req.db = conn;
  next();
});
app.use(router); // Use the userRoutes

const port = 8000;
app.listen(port, async () => {
  await initMySQL();
  console.log(`HTTP sever run at : ${port}`);
});
