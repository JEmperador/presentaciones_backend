const fs = require("fs");

const path = "../mock/carts.json";

class CartManager {
  constructor() {
    this.carts = [];
    this.id = 0;
  }

  async createCart() {
    const carts = await this.getCarts();

    try {
      const lastId = carts.reduce(
        (acc, curr) => {
          if (curr.id > acc.id) {
            return curr;
          } else {
            return acc;
          }
        },
        { id: 0 }
      );

      const cart = {
        id: lastId.id + 1,
        products: [],
      };

      carts.push(cart);
      await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
      return carts;
    } catch (err) {
      return console.log(err);
    }
  }

  async getCarts() {
    try {
      if (fs.existsSync(path)) {
        const data = await fs.promises.readFile(path, "utf-8");
        const carts = JSON.parse(data);
        return carts;
      } else {
        return [];
      }
    } catch {
      return err;
    }
  }

  async getCartById(idCart) {
    const carts = await this.getCarts();
    try {
      const cartId = Object.values(carts).find((cart) => cart.id === idCart);

      if (cartId === undefined) {
        return console.error("El producto no existe");
      } else {
        return cartId;
      }
    } catch (err) {
      return console.error(err);
    }
  }

  async updateCart(idCart, idProduct, quantity = 1) {
    const carts = await this.getCarts();
    try {
      const cart = await carts.find((cart) => cart.id === idCart);
      if (cart === undefined) {
        return console.log(`El carrito con id: ${idCart} no existe`);
      }

      if (!cart.products) {
        cart.products = [];
        return console.log(`El carrito no pose productos`);
      }

      const productExist = cart.products.find((product) => product.id === idProduct);
      if (productExist) {
        productExist.quantity += quantity;
      } else {
        cart.products.push({
          id: idProduct,
          quantity,
        });
      }

      await fs.promises.writeFile(path, JSON.stringify(carts, null, "\t"));
      return cart;
    } catch (err) {
      return console.error(err);
    }
  }

  async deleteCart(idCart) {
    let carts = await this.getCarts();
    try {
      const cart = Object.values(carts).find((e) => e.id === idCart);
      if (cart) {
        carts = carts.filter((item) => item.id !== idCart);
        await fs.promises.writeFile(path, JSON.stringify(carts), "utf-8");

        return console.log("Carrito eleminado correctamente");
      } else {
        return console.error("El Carrito no existe");
      }
    } catch (err) {
      return console.error(err);
    }
  }
}

module.exports = CartManager;
