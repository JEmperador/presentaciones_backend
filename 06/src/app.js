import ProductManager from "./ProductManager.js";
const productManager = new ProductManager();
import express from "express";
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server running at port: ${port}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Bienvenido" });
});

app.get("/products", async (req, res) => {
  const { limit } = req.query;
  try {
    const products = await productManager.getProducts();
    if (!limit) {
      res.status(200).json(products);
    } else {
      const productsLimited = products.slice(0, limit);
      res.status(200).json(productsLimited);
    }
  } catch (err) {
    res.status(400).json({ error404: "Bad Request" });
  }
});

app.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const productId = await productManager.getProductById(Number(pid));
    if (productId === undefined) {
      res.status(404).json({ error404: "Not Found" });
    } else {
      res.status(200).json(productId);
    }
  } catch (err) {
    res.status(400).json({ error400: "Bad Request" });
  }
});
