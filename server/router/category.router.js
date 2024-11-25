const express = require("express")
const categoryController = require("../controller.js/category.controller")
const router = express.Router()

router.post("/newcategory", categoryController.newCategory)
router.get("/getallcategory", categoryController.getAllCategories)
router.get("/getcategorybyid/:_id", categoryController.getCategoryByID)




module.exports = router