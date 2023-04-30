import mongoose from "mongoose"

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
    default: "plaintext",
    require: true,
  },
})

export default mongoose.models.Deck || mongoose.model("Deck", DeckSchema)
