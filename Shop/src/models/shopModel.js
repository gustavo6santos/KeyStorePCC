const Shop = mongoose.model("Shop", {
  gameid: String,
  userid: String,
  data: Date,
});

module.exports = Shop;
