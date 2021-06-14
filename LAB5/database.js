const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./product.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
});

exports.getProducts = () =>
  new Promise((resolve, reject) => {
    db.all("SELECT * FROM PRODUCT", (err, rows) => {
      if (err) reject(err);
      else {
        resolve(rows);
      }
    });
  });

exports.getProductById = (id) =>
  new Promise((resolve, reject) => {
    db.get("SELECT * FROM PRODUCT WHERE product_id = ?", [id], (err, row) => {
      if (err) reject(err);
      else {
        resolve(row);
      }
    });
  });

exports.getCategories = () =>
  new Promise((resolve, reject) => {
    exports
      .getProducts()
      .then((products) => {
        const categories = [];

        for (let product of products) {
          const category = product.product_category;
          if (!categories.includes(category)) {
            categories.push(category);
          }
        }

        resolve(categories);
      })
      .catch(reject);
  });
