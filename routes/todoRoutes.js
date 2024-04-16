const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const path = require("path");
const Todo = require("../models/todo");

mongoose.connect('mongodb://127.0.0.1:27017/LaptopStore');
 
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  try {
    const { email,username,password } = req.body;
    const newUser = new Todo({ email,username,password });
    await newUser.save();
    res.redirect("/login");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send({ success: false, message: "Error registering user" });
  }
});


router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body; // Извлекаем username и password из запроса
    const user = await Todo.findOne({ username }); // Ищем пользователя по username

    if (!user) {
      return res.status(400).send({ success: false, message: "User not found" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).send({ success: false, message: "Invalid password" });
    }

    // Вы можете выполнить дополнительные действия здесь, например, создать сеанс для пользователя

    res.redirect("/"); // Перенаправляем пользователя на главную страницу после успешного входа
  } catch (error) {
    res.status(500).send({ success: false, message: "Error logging in" });
  }
});

router.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.render("todos", { todos });
  } catch (error) {
    res.status(500).send({ success: false, message: "Error fetching todos" });
  }
});

router.post("/todos", async (req, res) => {
  try {
    const { task } = req.body;
    const newTodo = new Todo({ task });
    await newTodo.save();
    res.redirect("/todos");
  } catch (error) {
    res.status(500).send({ success: false, message: "Error creating todo" });
  }
});

router.put("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todoToUpdate = await Todo.findById(id);

    if (todoToUpdate) {
      todoToUpdate.completed = !todoToUpdate.completed;
      await todoToUpdate.save();
      res.redirect("/todos");
    } else {
      res.status(404).send({ success: false, message: "Todo not found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: "Error updating todo" });
  }
});

router.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Todo.findByIdAndDelete(id);
    res.redirect("/todos");
  } catch (error) {
    res.status(500).send({ success: false, message: "Error deleting todo" });
  }
});

module.exports = router;