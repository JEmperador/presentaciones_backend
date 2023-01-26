const CartManager = require("../../managers/CartManager");
const cartManager = new CartManager();

const { Router } = require("express");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.status(200).json(carts)
  } catch (err) {
    res.status(400).json({ error404: "Bad Request" });
  }
});

module.exports = router;