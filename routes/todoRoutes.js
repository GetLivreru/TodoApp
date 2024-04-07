const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const path = require("path");
const Todo = require("../models/todo");

mongoose.connect('mongodb://127.0.0.1:27017/todo');
 
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  try {
     
  } catch (error) {
     
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  try {
     
  } catch (error) {
     
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