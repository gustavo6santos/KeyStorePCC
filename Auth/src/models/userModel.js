const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
  compras: [{

    gameid: String,

    data: Date,

  }],
});

module.exports = User;
