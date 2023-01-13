import fs from "fs";

const path = "./products.json";

class ProductManager {
  constructor() {
    this.products = [];
    this.id = 0;
  }

  async getProducts() {
    try {
      if (fs.existsSync(path)) {
        //si existe lo muestra
        const data = await fs.promises.readFile(path, "utf-8");
        const products = JSON.parse(data);
        return products;
      } else {
        //sino devuelve array vacio
        return [];
      }
    } catch (err) {
      console.log(err);
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      const products = await this.getProducts();
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
        return `El producto con el codigo: ${product.code} ya existe \n`;
      } else {
        products.push(product);
        await fs.promises.writeFile(path, JSON.stringify(products, null, "\t"));
        console.log(products);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async updateProduct(idProduct, propUpdates) {
    try {
      const products = await this.getProducts();
      const index = await products.findIndex((product) => product.id === idProduct);
      if (index === -1) console.log("No se encontro producto");
      const updateProduct = Object.assign(products[index], propUpdates);
      fs.writeFileSync(path, JSON.stringify(updateProduct), "utf-8");
      const updatedProduct = products[index];
      console.log(updatedProduct);
    } catch (err) {
      console.log(err);
    }
  }

  async getProductsById(idProduct) {
    try {
      const products = await this.getProducts();
      const product = await products.find((product) => product.id === idProduct);
      console.log(product);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProduct(idProduct) {
    try {
      const products = await this.getProducts();
      const newProducts = await products.filter((product) => product.id !== idProduct);
      const newProductsStr = JSON.stringify(newProducts);
      fs.writeFileSync(path, newProductsStr, "utf-8");
    } catch (err) {
      console.log(err);
    }
  }
}

const manager = new ProductManager();

/* const consulta = async () => {
  console.log("consulta de productos");
  const queryProducts = await manager.getProducts();
  console.log(queryProducts);
};
consulta() */

/* const carga = async () => {
  console.log("carga de producto");
  const product1 = await manager.addProduct("producto prueba", "Lorem Ipsum", 200, "https://picsum.photos/200", "abc123", 25);
  const product2 = await manager.addProduct("producto prueba1", "Lorem Ipsum1", 201, "https://picsum.photos/201", "abc1231", 251);
};
carga(); */

/* const consultaPorId = async () => {
  console.log("consulta de producto por id");
  const idProduct = await manager.getProductsById(1);
};
consultaPorId(); */

/* const actualizar = async () => {
  console.log("actualizar producto");
  const productUpdate1 = await manager.updateProduct(1, { title: "algo nuevo", description: "haha", stock: 50 });
};
actualizar(); */

const borrar = async () => {
  console.log("borrado de elemento en el array");
  const idDelete = await manager.deleteProduct();
};
borrar();