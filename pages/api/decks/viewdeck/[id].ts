import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]"
import dbConnect from "../../../../lib/dbConnect"
import Deck from "@/models/Deck"
import Card from "@/models/Card"

import type { NextApiRequest, NextApiResponse } from "next"

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
      const deckCards = await Card.find({ deck: deck })
      res.status(200).json({ success: true, deck: myDeck[0], cards: deckCards })
    } catch (err) {
      res.status(400).json({ success: false })
    }
  }
}
