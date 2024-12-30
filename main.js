const express = require("express"); //import express
const app = express(); //varible of working with express
const bodyParser = require("body-parser"); //for get value from body in html
const mysql = require("mysql2/promise"); //import sql
const cors = require("cors");

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

//GET : users
app.get("/users", async (req, res) => {
  const [results] = await conn.query("SELECT * FROM users");
  res.send(results);
});

//GET : user(id)
app.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let [results] = await conn.query("SELECT * FROM users WHERE id = ?", [id]);
    if (results.lenght === 0)
      return res.status(404).json({ error: "User not found!!" });
    res.json(results[0])
  } catch (error) {
    console.error("Eror fetching user :", error.message);
    res.status(500).json({ error: "Eror fetching user" });
  }
});

//POST : create new user
app.post("/user", async (req, res) => {
  try {
    const data = req.body;
    const result = await conn.query("INSERT INTO users SET ?", data);
    const userID = result[0].insertID;
    res.status(201).json({ message: "User created succesfully!", userID });
  } catch (error) {
    console.error("Eror create user:", error.message);
    res.status(500).json({ error: "Eror create user" });
  }
});

//PUT : update user(id) (data user from postman)
app.put("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await conn.query("UPDATE users SET ? WHERE id = ?", [
      data,
      id,
    ]);
    if (result[0].affectedRows === 0) 
      return res.status(404).json({ message: "User not found" });
    res.json({message:"User update successfully", id})
  } catch (error) {
    console.error("Eror updating user:", error.message)
    res.status(500).json({error:"Eror updating user"})
  }
});

//DELETE : deleate user(id)
app.delete("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await conn.query("DELETE FROM users WHERE id = ?", id)
    if (result[0].affectedRows === 0) 
      return res.status(404).json({message : "User not found"})
    res.json({message:"User deleting succesfully"})
  } catch(error) {
    console.error("Eror deleting user", error.message)
    res.status(500).json({error : "Eror deleting user"})
  }
});

const port = 8000;
app.listen(port, async (req, res) => {
  await initMySQL();
  console.log("http sever run at : " + port);
});
