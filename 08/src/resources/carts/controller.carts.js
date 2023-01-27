const CartManager = require("../../managers/CartManager");
const cartManager = new CartManager();

const { Router } = require("express");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.status(200).json({ message: carts });
  } catch (err) {
    res.status(400).json({ error404: "Bad Request" });
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const cartId = await cartManager.getCartById(Number(cid));
    if (cartId === undefined) {
      res.status(404).json({ error404: "Not Found" });
    } else {
      res.status(200).json({ message: cartId });
    }
  } catch (err) {
    res.status(400).json({ error400: "Bad Request" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const quantity = req.body.quantity || 1;
  try {
    const update = await cartManager.updateCart(Number(cid), Number(pid), quantity);
    if (update) {
      res.status(200).json({ message: `The product ${pid} in cart ${cid} was successfully updated` });
    } else {
      res.status(404).json({ message: "Not not found" });
    }
  } catch (err) {
    res.status(400).json({ error400: "Bad Request" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(200).json({ message: `A new cart was created` });
  } catch (err) {
    res.status(400).json({ error400: "Bad Request" });
  }
});

router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    await cartManager.deleteCart(Number(cid));
    res.status(200).json({ message: `Product with id: ${cid} was removed` });
  } catch (err) {
    res.status(400).json({ error400: "Bad Request" });
  }
});

module.exports = router;
