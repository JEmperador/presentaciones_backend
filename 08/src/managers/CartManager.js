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
      return console.log(carts);
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
      return console.log(err);
    }
  }

  async getCartById(idCart) {
    const carts = await this.getCarts();
    try {
      const cartId = Object.values(carts).find((cart) => cart.id === idCart);

      if (cartId === undefined) {
        return console.error("El producto no existe");
      } else {
        return console.log(cartId);
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
      return console.log(`El Carrito con id: ${idCart}, actualizo el producto; ${idProduct} satisfactoriamente`);
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

/* const manager = new CartManager(); */

/* const consulta = async () => {
  console.log("----------Consulta de carritos----------");
  const queryCarts = await manager.getCarts();
  console.log(queryCarts);
};
consulta(); */

/* const consultaPorId = async () => {
  console.log("----------Consulta de producto por id----------");
  const idCart = await manager.getCartById(4);
};
consultaPorId(); */

/* const crearCarrito = async () => {
  console.log("----------Consulta de producto por id----------");
  const carrito4 = await manager.createCart();
  const carrito5 = await manager.createCart();
};
crearCarrito(); */

/* const agregarProductos = async () => {
  console.log("----------Agregar productos pegando al id del carrito----------");
  const carritoProducto = await manager.updateCart(3, 3, 2);
};
agregarProductos(); */

/* const eliminarCarrito = async () => {
  console.log("----------Agregar productos pegando al id del carrito----------");
  const eliminaCarrito = await manager.deleteCart(2);
};
eliminarCarrito(); */
