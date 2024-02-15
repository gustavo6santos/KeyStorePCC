require("dotenv").config();
const mongoose = require("mongoose");

const Shop = require("../models/shopModel");

//add a product to the wishlist
exports.addProduct = async (req, res) => {
  try {
    // Verify if the game is available
    const game = await Game.findById(gameid);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    // Verify if the user exists
    const user = await User.findById(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the game is already in the wishlist
    const existingShopItem = await Shop.findOne({ gameid, user });
    if (existingShopItem) {
      return res.status(400).json({ error: "Game is already in the wishlist" });
    }

    // Add the game to the wishlist
    const newShopItem = new Shop({
      gameid,
      userEmail,
      data: new Date(),
    });

    const savedShopItem = await newShopItem.save();
    res.status(201).json(savedShopItem);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//delete a product to the wishlist
exports.deleteProduct = async (req, res) => {
  const { gameid, user } = req.body;

  try {
    // Remove the game from the wishlist
    const deletedShopItem = await Shop.findOneAndDelete({ gameid, user });

    if (!deletedShopItem) {
      return res.status(404).json({ error: "Game not found in the wishlist" });
    }

    res.status(200).json({ message: "Game removed from the wishlist" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//purchase a product from the wishlist
exports.addPurchase = async (req, res) => {
  const { gameid, user } = req.body;

  try {
    // Verify if the game is available
    const game = await Game.findById(gameid);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    // Verify if the user exists
    const user = await User.findById(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the game is in the wishlist
    const existingShopItem = await Shop.findOne({ gameid, user });
    if (!existingShopItem) {
      return res.status(400).json({ error: "Game is not in the wishlist" });
    }

    // Remove the game from the wishlist
    await Shop.findOneAndDelete({ gameid, user });

    // Add the game to the user's purchased games
    user.purchasedGames.push(gameid);
    await user.save();

    res.status(201).json({ message: "Game purchased successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//delete a purchase of product from the wishlist
exports.deletePurchase = async (req, res) => {
  const { gameid, user } = req.body;

  try {
    // Verify if the game is available
    const game = await Game.findById(gameid);
    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    // Verify if the user exists
    const user = await User.findById(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the game is in the user's purchased games
    const purchasedIndex = user.purchasedGames.indexOf(gameid);
    if (purchasedIndex === -1) {
      return res.status(400).json({ error: "Game is not in the purchased list" });
    }

    // Remove the game from the user's purchased games
    user.purchasedGames.splice(purchasedIndex, 1);
    await user.save();

    res.status(200).json({ message: "Purchase deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
