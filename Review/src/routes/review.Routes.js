const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");

// Routes

// Route to create a new review
router.post("/review/create", reviewController.createReview);

// Route to edit an existing review
router.put("/reviews/edit/:reviewId", reviewController.editReview);

// Route to get reviews for a specific user
router.get("/reviews/:gameid", reviewController.getReview);

// Route to delete an existing review
router.delete("/reviews/delete/:reviewId", reviewController.deleteReview);

module.exports = router;
