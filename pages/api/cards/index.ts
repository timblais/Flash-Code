import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import dbConnect from "../../../lib/dbConnect"
import Deck from "@/models/Deck"
import Card from "@/models/Card"

import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req
  const session = await getServerSession(req, res, authOptions)
  await dbConnect()

  if (!session) {
    return res.send({
      error: "You must be logged in to access this content.",
    })
  }

  if (method === "POST") {
    // Create a new card and increment deck card count
    try {
      const deck = await Deck.findOneAndUpdate(
        { _id: req.body.deckId },
        { $inc: { totalCards: 1 } },
        { new: true }
      )
      const card = await Card.create({
        createdBy: req.body.user,
        createdDate: new Date(),
        title: req.body.cardTitle,
        dueDate: new Date(),
        deck: req.body.deckId,
        question: req.body.question,
        answer: req.body.answer,
        repetitionNumber: 0,
        easinessFactor: 2.5,
        repetitionInterval: 1,
        totalViews: 0,
        language: req.body.language,
      })
      res.status(200).json({ success: true, deck: deck, card: card })
    } catch (err) {
      res.status(400).json({ success: false })
    }
  } else if (method === "DELETE") {
    //Delete's card and removes count from the deck
    try {
      const deck = await Deck.findOneAndUpdate(
        { _id: req.body.deckId },
        { $inc: { totalCards: -1 } },
        { new: true }
      )
      const card = await Card.findOneAndDelete({ _id: req.body.cardId })
      res.status(200).json({ success: true, deck: deck, card: card })
    } catch (err) {
      res.status(400).json({ success: false })
    }
  } else if (method === "PUT") {
    const action = req.body.editAction

    if (action === "standardEdit") {
      // Edit card content without resetting
      try {
        const card = await Card.findOneAndUpdate(
          { _id: req.body.cardId },
          {
            question: req.body.question,
            answer: req.body.answer,
          },
          { new: true }
        )
        res.status(200).json({ success: true, card: card })
      } catch (err) {
        res.status(400).json({ success: false })
      }
    } else if (action === "editReset") {
      // Edit card and reset stats
      try {
        const card = await Card.findOneAndUpdate(
          { _id: req.body.cardId },
          {
            dueDate: new Date(),
            question: req.body.question,
            answer: req.body.answer,
            repetitionNumber: 0,
            easinessFactor: 2.5,
            repetitionInterval: 1,
            totalViews: 0,
          },
          { new: true }
        )
        res.status(200).json({ success: true, card: card })
      } catch (err) {
        res.status(400).json({ success: false })
      }
    } else if (action === "updateRating") {
      // Update card rating
      try {
        const card = await Card.findOneAndUpdate(
          { _id: req.body.cardId },
          {
            dueDate: req.body.dueDate,
            repetitionNumber: req.body.repetitionNumber,
            easinessFactor: req.body.easinessFactor,
            repetitionInterval: req.body.repetitionInterval,
            totalViews: req.body.totalViews,
          },
          { new: true }
        )
        res.status(200).json({ success: true, card: card })
      } catch (err) {
        res.status(400).json({ success: false })
      }
    }
  }
}
