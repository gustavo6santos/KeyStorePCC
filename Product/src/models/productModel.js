const mongoose = require("mongoose");

const Game = mongoose.model("Game", {
  title: String,
  price: Number,
  genre: String,
  stock: Number,
  ram: Number,
  cpuModel: String,
  gpuModel: String,
  ostype: String,
});

module.exports = Game;
