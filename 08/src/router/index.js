const productsController = require("../resources/products/controller.products")
const cartsController = require("../resources/carts/controller.carts")

const router = (app) => {
    app.use("/api/products", productsController)
    app.use("/api/carts", cartsController)
}

module.exports = router;