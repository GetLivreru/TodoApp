const express = require("express");
const methodOverride = require("method-override");

const app = express();
const port = 3000;
const todoRoutes = require("./routes/todoRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.use(methodOverride("_method"));

app.use(todoRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
