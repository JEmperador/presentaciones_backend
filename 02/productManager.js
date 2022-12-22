class ProductManager {
  products = [];

  constructor() {
    this.id = 0;
  }

  getProducts() {
    return this.products;
  }

  addProduct(code, title, description, price, thumbnail, stock) {
    this.id++;

    const products = {
      id: this.id,
      code,
      title,
      description,
      price,
      thumbnail,
      stock,
    };

    //prueba1
    /* const validIds = [products.code];
    console.log(validIds);
    if(!validIds.includes(this.code)) {
        return `Ya existe un producto con este codigo: ${products.code}`
    } */

    //prueba2
    const [product] = this.products.filter((product) => product.code === code)

    if(product) {
      return `El producto con el codigo: ${product.code} ya existe \n`
    }

    this.products.push(products);

    return `Producto agregado con el id: ${this.id} \n`;
  }

  getProductsById(idProduct) {
    const [product] = this.products.filter((product) => product.id === idProduct);

    if (!product) {
      return `Not found \n`;
    }

    return product;
  }
}

const productsManager = new ProductManager();

//producto1
const codeProduct1 = "abc123";
const titleProduct1 = "Algo";
const descriptionProduct1 = "Lorem Ipsum";
const priceProduct1 = 500;
const thumbnailProduct1 = "https://picsum.photos/200";
const stockProduct1 = 10;

//producto2
const codeProduct2 = "abc1234";
const titleProduct2 = "Algo2";
const descriptionProduct2 = "Lorem Ipsum2";
const priceProduct2 = 5000;
const thumbnailProduct2 = "https://picsum.photos/300";
const stockProduct2 = 100;

//consulta productos
console.log(productsManager.getProducts());

//consulta agregando un producto
console.log(productsManager.addProduct(codeProduct1, titleProduct1, descriptionProduct1, priceProduct1, thumbnailProduct1, stockProduct1));
console.log(productsManager.addProduct(codeProduct2, titleProduct2, descriptionProduct2, priceProduct2, thumbnailProduct2, stockProduct2));

//consulta productos
console.log(productsManager.getProducts());

//consulta agregando el mismo producto
console.log(productsManager.addProduct(codeProduct1, titleProduct1, descriptionProduct1, priceProduct1, thumbnailProduct1, stockProduct1));
console.log(productsManager.addProduct(codeProduct2, titleProduct2, descriptionProduct2, priceProduct2, thumbnailProduct2, stockProduct2));

//consulta si existe un producto
console.log(productsManager.getProductsById(1));
console.log(productsManager.getProductsById(5));
