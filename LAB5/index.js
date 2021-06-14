const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const database = require("./database");
const { postReview, getReviews } = require("./review");

const PORT = 3000;

app.set("view engine", "ejs");
app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
  database
    .getProducts()
    .then((products) => {
      database
        .getCategories()
        .then((categories) => {
          const { category, query } = req.query;

          if (query) {
            products = products.filter((product) =>
              product.product_title.includes(query)
            );
          }

          if (category !== "all" && category) {
            products = products.filter(
              (product) => product.product_category === category
            );
          }

          res.render("index", { products, categories });
        })
        .catch(next);
    })
    .catch(next);
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/product/:product_id", (req, res, next) => {
  const { product_id } = req.params;
  database
    .getProductById(product_id)
    .then((product) => {
      const reviews = getReviews(product_id);
      res.render("product", { product, reviews });
    })
    .catch(next);
});

app.post("/product/:product_id/reviews", (req, res, next) => {
  const { product_id } = req.params;
  const { review } = req.body;

  database
    .getProductById(product_id)
    .then((product) => {
      postReview(product_id, review);
      res.redirect(`/product/${product_id}`);
    })
    .catch(next);
});

app.listen(PORT, () => {
  console.log(`App listening on ${PORT}`);
});
