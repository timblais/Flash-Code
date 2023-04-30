import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"
import dbConnect from "@/lib/dbconnect"
import Deck from "@/models/Deck"

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

  if (method === "GET") {
    // Get the list of decks for this user
    const user = req.body.user
    try {
      const getUserDecks = await Deck.find({ createdBy: user })
      res.status(200).json({ success: true, data: getUserDecks })
    } catch (err) {
      res.status(400).json({ success: false })
    }
    // Create a new deck for this user
  } else if (method === "POST") {
    try {
      const createNewDeck = await Deck.create({
        createdBy: req.body.user,
        createdDate: new Date(),
        title: req.body.deckTitle,
        language: req.body.language,
        totalCards: 0,
      })
      res.status(201).json({ success: true, data: createNewDeck })
    } catch (err) {
      res.status(400).json({ success: false })
    }
  }
}
