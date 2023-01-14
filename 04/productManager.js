import fs from "fs";

const path = "./products.json";

class ProductManager {
  constructor() {
    this.products = [];
    this.id = 0;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
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
        price,
        thumbnail,
        code,
        stock,
      };

      if (products.find((product) => product.code === code)) {
        return console.log(`El producto con el codigo: ${product.code} ya existe`);
      } else {
        products.push(product);
        await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));

        return console.log(products);
      }
    } catch (err) {
      return console.log(err);
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
      return console.log(err);
    }
  }

  async getProductById(idProduct) {
    const products = await this.getProducts();
    try {
      const itemId = Object.values(products).find((product) => product.id === idProduct);

      if (itemId === undefined) {
        return console.error("El producto no existe");
      } else {
        return console.log(itemId);
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

        return console.log(updatedProduct);
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

        return console.log("Producto eleminado correctamente");
      } else {
        return console.error("El producto no existe");
      }
    } catch (err) {
      return console.error(err);
    }
  }
}

const manager = new ProductManager();

/* const consulta = async () => {
  console.log("----------Consulta de productos----------");
  const queryProducts = await manager.getProducts();
  console.log(queryProducts);
};
consulta() */

/* const carga = async () => {
  console.log("----------Carga de producto----------");
  const product1 = await manager.addProduct("producto prueba", "Lorem Ipsum", 200, "https://picsum.photos/200", "abc123", 25);
};
carga(); */

/* const consultaPorId = async () => {
  console.log("----------Consulta de producto por id----------");
  const idProduct = await manager.getProductById(1);
};
consultaPorId(); */

const actualizar = async () => {
  console.log("----------Actualizacion de producto----------");
  const productUpdate1 = await manager.updateProduct(1, { title: "producto prueba modificado", description: "Lorem Ipsum modificado", stock: 50 });
};
actualizar();

/* const borrar = async () => {
  console.log("----------Borra producto por id----------");
  const idDelete = await manager.deleteProduct(1);
};
borrar(); */
