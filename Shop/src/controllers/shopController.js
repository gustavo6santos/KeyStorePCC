require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");
const Shop = require("../models/shopModel");


exports.addPurchase = async (req, response) => {
  const { gameid, userEmail, data } = req.body;

  // Check if the user with the provided email exists
  axios
    .get(`http://localhost:3001/user/verify/${userEmail}`)
    .then((res) => {
      const { success } = res.data;
      if (success === 1) {
        axios
          .get(`http://localhost:3002/game/verify/${gameid}`)
          .then(async (res) => {
            const { success } = res.data;
            if (success === 1) {
              // Create the purchase with the game name
              const shop = new Shop({ gameid, userEmail, data });
              try {
                await Shop.save();
                return response.status(201).json(shop);
              } catch (error) {
                console.error(error);
                return response.status(500).send("Internal server error");
              }
            } else {
              return response.status(404).send("Game not found");
            }
          })
          .catch((error) => {
            return response.status(500).send({ error: error, message: error.message });
          });
      } else {
        return response.status(404).send("User not found");
      }
    })
    .catch((error) => {
      return response.status(500).send({ error: error, message: error.message });
    });
};

//get a purchase 
exports.getPurchase = async (req, res) => {
  try {
    const purchaseId = req.params.id;
    const shop = await Game.findById(purchaseId);
    if (!shop) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.status(200).json(shop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to delete an existing review
exports.deletePurchase = async (req, res) => {
  try {
    const purchaseId = req.params.shopId;

    const shop = await Shop.findByIdAndDelete(purchaseId);
    if (!deletedPurchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.status(200).json({ message: "Purchase deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};







/*
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
*/
