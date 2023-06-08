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
    const deck = id
    try {
      const myDeck = await Deck.find({ _id: deck })
      const cards = await Card.find({ deck: deck })

      let cardsDue: CardObject[] = []

      for (const card of cards) {
        let dateDue = new Date(card["dueDate"])
        let tomorrow = new Date()
        tomorrow.setHours(24, 0, 0, 0)
        if (dateDue <= tomorrow) {
          cardsDue.push(card)
        }
      }

      cardsDue.sort(
        (a, b) => Date.parse(a["dueDate"]) - Date.parse(b["dueDate"])
      )

      res.status(200).json({ success: true, deck: myDeck[0], cards: cardsDue })
    } catch (err) {
      res.status(400).json({ success: false })
    }
  }
}
