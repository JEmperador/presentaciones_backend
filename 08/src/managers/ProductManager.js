const fs = require("fs");

const path = "./mock/products.json";

class ProductManager {
  constructor() {
    this.products = [];
    this.id = 0;
  }

  async addProduct(title, description, code, price, stock, category, thumbnail) {
    const products = await this.getProducts();

    try {
      const lastId = products.reduce(
        (acc, curr) => {
          if (curr.id > acc.id) {
            return curr;
          } else {
            return acc;
          }
        },
        { id: 0 }
      );

      const product = {
        id: lastId.id + 1,
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnail
      };

      if (products.find((product) => product.code === code)) {
        return console.log(`El producto con el codigo: ${product.code} ya existe`);
      } else {
        products.push(product);
        await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));

        return product;
      }
    } catch (err) {
      return console.error(err);
    }
  }

  async getProducts() {
    try {
      if (fs.existsSync(path)) {
        const data = await fs.promises.readFile(path, "utf-8");
        const products = JSON.parse(data);
        return products;
      } else {
        return [];
      }
    } catch (err) {
      return console.error(err);
    }
  }

  async getProductById(idProduct) {
    const products = await this.getProducts();
    try {
      const productId = Object.values(products).find((product) => product.id === idProduct);

      if (productId === undefined) {
        return console.error("El producto no existe");
      } else {
        return productId;
      }
    } catch (err) {
      return console.error(err);
    }
  }

  async updateProduct(idProduct, propsProduct) {
    const products = await this.getProducts();
    try {
      const index = await products.findIndex((product) => product.id === idProduct);

      if (index === -1) {
        return console.log("El producto no existe");
      } else {
        Object.assign(products[index], propsProduct);
        await fs.promises.writeFile(path, JSON.stringify(products), "utf-8");
        const updatedProduct = products[index];

        return updatedProduct;
      }
    } catch (err) {
      return console.error(err);
    }
  }

  async deleteProduct(idProduct) {
    let products = await this.getProducts();
    try {
      const product = Object.values(products).find((e) => e.id === idProduct);

      if (product) {
        products = products.filter((item) => item.id !== idProduct);
        await fs.promises.writeFile(path, JSON.stringify(products), "utf-8");

        return console.log(`Producto con id: ${idProduct} eleminado correctamente`);
      } else {
        return console.error("El producto no existe");
      }
    } catch (err) {
      return console.error(err);
    }
  }
}

module.exports = ProductManager;