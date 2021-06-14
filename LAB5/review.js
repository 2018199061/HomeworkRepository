const fs = require("fs");

exports.getReviews = (productId) => {
  const data = JSON.parse(fs.readFileSync("./comment.json", "utf-8"));
  if (data[productId]) {
    return data[productId];
  } else {
    return [];
  }
};

exports.postReview = (productId, review) => {
  let data = JSON.parse(fs.readFileSync("./comment.json", "utf-8"));
  if (data[productId]) {
    data[productId].push(review);
  } else {
    data[productId] = [review];
  }
  fs.writeFileSync("./comment.json", JSON.stringify(data, null, 4));
};
