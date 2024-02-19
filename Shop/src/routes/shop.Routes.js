const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shopController");


// Route to add Purchase
router.post("/shop/add", shopController.addPurchase);

//Route to get a purchase by id
router.get("/shop/:purchaseId", shopController.getPurchase);

// Route to delete an existing purchase
router.delete("/shop/delete/:gameid", shopController.deletePurchase);

module.exports = router;
