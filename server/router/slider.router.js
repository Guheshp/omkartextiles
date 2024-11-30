const express = require("express")
const sliderController = require("../controller.js/slider.controller")
const router = express.Router()

router.post("/createslider", sliderController.upload, sliderController.createSlider)
router.get("/getallslider", sliderController.getSlider)



module.exports = router