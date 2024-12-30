const express = require("express");
const router = express.Router();

// Routes definition
router.get("/users", async (req, res) => {
  try {
    const [results] = await req.db.query("SELECT * FROM users");
  res.send(results);
  } catch(error) {
    console.error("Eror fetching users :", error.message);
  }
});

//GET : user(id)
router.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let [results] = await req.db.query("SELECT * FROM users WHERE id = ?", [
      id,
    ]);
    if (results.lenght === 0)
      return res.status(404).json({ error: "User not found!!" });
    res.json(results[0])
  } catch (error) {
    console.error("Eror fetching user :", error.message);
    res.status(500).json({ error: "Eror fetching user" });
  }
});

//POST : create new user
router.post("/user", async (req, res) => {
  try {
    const data = req.body;
    const result = await req.db.query("INSERT INTO users SET ?", data);
    const userID = result[0].insertID;
    res.status(201).json({ message: "User created succesfully!", userID });
  } catch (error) {
    console.error("Eror create user:", error.message);
    res.status(500).json({ error: "Eror create user" });
  }
});

//PUT : update user(id) (data user from postman)
router.put("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await req.db.query("UPDATE users SET ? WHERE id = ?", [
      data,
      id,
    ]);
    if (result[0].affectedRows === 0)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User update successfully", id });
  } catch (error) {
    console.error("Eror updating user:", error.message);
    res.status(500).json({ error: "Eror updating user" });
  }
});

//DELETE : deleate user(id)
router.delete("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await req.d.query("DELETE FROM users WHERE id = ?", id);
    if (result[0].affectedRows === 0)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleting succesfully" });
  } catch (error) {
    console.error("Eror deleting user", error.message);
    res.status(500).json({ error: "Eror deleting user" });
  }
});

module.exports = router;
