const mongoose = require("mongoose");

const Review = mongoose.model("Review", {
  gameid: String,
  userEmail: String,
  rating: Number,
  comment: String,
});

module.exports = Review;
