const express = require("express")
const moneyPickController = require("../controller.js/monypick.controller")
const router = express.Router()

router.post("/createmoneypick", moneyPickController.upload, moneyPickController.newMoneyPick)

router.get("/getallmoneypick", moneyPickController.getALlMoneyPick)
router.get("/getmoneypickbuid/:_id", moneyPickController.fetMoneyPickByID)
router.get("/getallproductsbymoneypicks/:_id", moneyPickController.getAllProductsByMoneyPicks)

module.exports = router