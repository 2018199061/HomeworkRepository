const express = require("express");
const app = express();

const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./product.db", (err) => {
  if (err) {
    return console.error(err.message);
  }

  console.log("connected to database");
});

const getProducts = () =>
  new Promise((resolve, reject) => {
    db.all("SELECT * FROM PRODUCT", (err, rows) => {
      if (err) reject(err);
      else {
        resolve(rows);
      }
    });
  });

const PORT = 3000;

app.set("view engine", "ejs");
app.use("/public", express.static("public"));

app.get("/", (req, res, next) => {
  getProducts()
    .then((products) => res.render("index", { products }))
    .catch(next);
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
