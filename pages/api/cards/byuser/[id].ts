import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]"
import dbConnect from "../../../../lib/dbConnect"
import Deck from "@/models/Deck"
import Card from "@/models/Card"
import { DecksWithCardsObject } from "@/types/documentTypes"

import type { NextApiRequest, NextApiResponse } from "next"
import { CardObject, DeckObject } from "@/types/documentTypes"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req
  const session = await getServerSession(req, res, authOptions)
  await dbConnect()

  if (!session) {
    return res.send({
      error: "You must be logged in to access this content.",
    })
  }

  if (method === "GET") {
    // Get the list of decks for this user
    const user = id
    try {
      const decks = await Deck.find({ createdBy: user })
      const cards = await Card.find({ createdBy: user })

      let decksAndCards: DecksWithCardsObject = {}
      for (const deck of decks) {
        decksAndCards[deck["_id"]] = { deck: deck, cards: [] }
      }

      for (const card of cards) {
        if (decksAndCards[card["deck"]]) {
          let date = new Date(card["dueDate"])
          let tomorrow = new Date()
          tomorrow.setHours(24, 0, 0, 0)
          if (date <= tomorrow) {
            decksAndCards[card["deck"]]["cards"].push(card)
          }
        }
      }
      res.status(200).json({ success: true, decks: decksAndCards })
    } catch (err) {
      res.status(400).json({ success: false })
    }
  }
}
