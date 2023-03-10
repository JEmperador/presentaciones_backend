class ProductManager {
  constructor() {
    this.products = [];
    this.id = 0;
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
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
    } else {
      this.id++;
      this.products.push(products);
    }

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

//instancia de la clase
/* const productsManager = new ProductManager(); */

//primera consulta => []
/* console.log(productsManager.getProducts()); */

//producto1
/* const titleProduct = "producto prueba";
const descriptionProduct = "Lorem Ipsum";
const priceProduct = 200;
const thumbnailProduct = "https://picsum.photos/200";
const codeProduct = "abc123";
const stockProduct = 25; */

//producto2
/* const titleProduct2 = "producto prueba";
const descriptionProduct2 = "Lorem Ipsum";
const priceProduct2 = 200;
const thumbnailProduct2 = "https://picsum.photos/200";
const codeProduct2 = "abc1234";
const stockProduct2 = 25; */

//carga de producto => Se cargo el producto numero: 1 satisfactoriamente
/* console.log(productsManager.addProduct(titleProduct, descriptionProduct, priceProduct, thumbnailProduct, codeProduct, stockProduct));
console.log(productsManager.addProduct(titleProduct2, descriptionProduct2, priceProduct2, thumbnailProduct2, codeProduct2, stockProduct2)); */

//segunda consulta => [{ id: 1, title: 'producto prueba', description: 'Lorem Ipsum', price: 200, thumbnail: 'https://picsum.photos/200', code: 'abc123', stock: 25}]
/* console.log(productsManager.getProducts()); */

//carga del mismo producto => El producto con el codigo: abc123 ya existe
/* console.log(productsManager.addProduct(titleProduct, descriptionProduct, priceProduct, thumbnailProduct, codeProduct, stockProduct)); */

//consulta si existe el producto => Not found
/* console.log(productsManager.getProductsById(5)); */

//consulta si existe el producto
/* console.log(productsManager.getProductsById(0)); */
