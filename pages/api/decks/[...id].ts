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
  const { id } = req.query
  const session = await getServerSession(req, res, authOptions)
  await dbConnect()

  if (!session) {
    return res.send({
      error: "You must be logged in to access this content.",
    })
  }

  if (id) {
    const params = id as string[]
    console.log(params)

    // returns all of the user's decks along with the cards associated and when they are due
    if (params.length === 1) {
      const user = params[0]
      try {
        const decks = await Deck.find({ createdBy: user })
        const cards = await Card.find({ createdBy: user })

        type deckAndCardsType = { [key: string]: any }
        let decksAndCards: deckAndCardsType = {}
        for (const deck of decks) {
          decksAndCards[deck["_id"]] = []
          decksAndCards[deck["_id"]][0] = deck
          decksAndCards[deck["_id"]][1] = []
        }

        for (const card of cards) {
          if (decksAndCards[card["deck"]]) {
            let date = new Date(card["dueDate"])
            let tomorrow = new Date()
            tomorrow.setHours(24, 0, 0, 0)
            if (date <= tomorrow) {
              console.log(true)
              decksAndCards[card["deck"]][1].push(card)
            }
          }
        }

        res.status(200).json({ success: true, decksAndCards: decksAndCards })
      } catch (err) {
        res.status(400).json({ success: false })
      }
    } else if (params.length === 2) {
      const user = params[0]
      const deck = params[1]
      try {
        const myDeck = await Deck.find({ createdBy: user, _id: deck })
        const deckCards = await Card.find({ createdBy: user, deck: deck })
        res
          .status(200)
          .json({ success: true, deck: myDeck[0], cards: deckCards })
      } catch (err) {
        res.status(400).json({ success: false })
      }
    }
  }
}
