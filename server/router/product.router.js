const express = require("express")
const productController = require("../controller.js/product.controller")
const router = express.Router()

router.post("/createproduct", productController.upload, productController.createProduct)
router.post("/createmoneypickproduct", productController.upload, productController.createMoneyPickProduct)
router.get("/getallproduct", productController.getAllProducts)
router.get("/newarrivals", productController.newArrivals)
router.get("/getproductbyid/:id", productController.getProductById)
router.delete("/deleteproduct/:id", productController.deleteProduct)


module.exports = router