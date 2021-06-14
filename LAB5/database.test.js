const database = require("./database");

describe("getProducts", () => {
  it("should connect", async () => {
    const products = await database.getProducts();
    if (products.length > 0) {
      for (let product of products) {
        expect(product).toHaveProperty("product_id");
        expect(product).toHaveProperty("product_image");
        expect(product).toHaveProperty("product_title");
        expect(product).toHaveProperty("product_price");
        expect(product).toHaveProperty("product_category");
      }
    }
  });
});

database.getProducts = jest.fn().mockResolvedValue([
  {
    product_id: 1,
    product_image:
      "http://image.kyobobook.co.kr/images/book/xlarge/153/x9791197037153.jpg",
    product_title: "작은 별이지만 빛나고 있어",
    product_price: 13500,
    product_category: "자기계발",
  },
  {
    product_id: 2,
    product_image:
      "http://image.kyobobook.co.kr/images/book/xlarge/257/x9791189550257.jpg",
    product_title: "처음 읽는 술의 세계사",
    product_price: 16000,
    product_category: "역사",
  },
  {
    product_id: 3,
    product_image:
      "http://image.kyobobook.co.kr/images/book/xlarge/443/x9791188635443.jpg",
    product_title: "21인의 위험한 뇌(세계사를 바꾼)",
    product_price: 18000,
    product_category: "역사",
  },
  {
    product_id: 4,
    product_image:
      "http://image.kyobobook.co.kr/images/book/xlarge/077/x9791162243077.jpg",
    product_title: "이것이 취업을 위한 코딩 테스트다",
    product_price: 18000,
    product_category: "컴퓨터",
  },
]);

describe("getCategories", () => {
  it("should return 1", async () => {
    const categories = await database.getCategories();
    expect(categories).toContainEqual('컴퓨터')
    expect(categories).toContainEqual('역사')
    expect(categories).toContainEqual('자기계발')
  });
});
