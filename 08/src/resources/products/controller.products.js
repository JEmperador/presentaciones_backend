const ProductManager = require("../../managers/ProductManager");
const productManager = new ProductManager();

const { Router } = require("express");
const router = Router();

router.post("/", async (req, res) => {
  const { title, description, code, price, stock, category } = req.body;
  const thumbnail = req.body.thumbnail || [];
  try {
    await productManager.addProduct(title, description, code, price, stock, category, thumbnail);
    res.status(201).json({ message: "Product created successfully" });
  } catch (err) {
    res.status(500).json({ error500: "error creating product" });
  }
});

router.get("/", async (req, res) => {
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

router.get("/:pid", async (req, res) => {
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

router.put("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const props = req.body;
  try {
    const updatedProduct = await productManager.updateProduct(Number(pid), props);
    if (!updatedProduct) {
      res.status(404).json({ error404: `Product with id: ${pid} not found.` });
    } else {
      res.json({ message: updatedProduct });
    }
  } catch (err) {
    res.status(500).json({ error400: "Bad Request" });
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    await productManager.deleteProduct(Number(pid));
    res.status(200).json({ message: `Product with id: ${pid} was removed` });
  } catch (err) {
    res.status(400).json({ error400: "Bad Request" });
  }
});

module.exports = router;
