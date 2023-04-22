const mongoose = require("mongoose");

const DeckSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    ref: "User",
    require: true,
  },

  createdDate: {
    type: Date,
    default: Date.now,
    require: true,
  },

  title: {
    type: String,
    require: true,
  },

  totalCards: {
    type: Number,
    require: true,
  },

  language: {
    type: String,
    default: 'plaintext',
    require: true,
  }

});

module.exports = mongoose.model("Deck", DeckSchema);


// mongoose.Schema.Types.ObjectId <= update created by type once user build is in place