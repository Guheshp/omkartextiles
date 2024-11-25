const express = require("express")
const productController = require("../controller.js/product.controller")
const router = express.Router()

router.post("/createproduct", productController.createProduct)
router.get("/getallproduct", productController.getAllProducts)
router.get("/getproductbyid/:id", productController.getProductById)
router.delete("/deleteproduct/:id", productController.deleteProduct)


module.exports = router