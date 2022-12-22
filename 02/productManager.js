class ProductManager {
  products = [];

  constructor() {
    this.id = 0;
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    this.id++;

    const products = {
      id: this.id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    const [product] = this.products.filter((product) => product.code === code);

    if (product) {
      return `El producto con el codigo: ${product.code} ya existe \n`;
    }

    this.products.push(products);

    return `Se cargo el producto numero: ${products.id} satisfactoriamente  \n`;
  }

  getProductsById(idProduct) {
    const [product] = this.products.filter((product) => product.id === idProduct);

    if (!product) {
      return `Not found \n`;
    }

    return product;
  }
}
