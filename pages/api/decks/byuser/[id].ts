import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]"
import dbConnect from "../../../../lib/dbConnect"
import Deck from "@/models/Deck"

import type { NextApiRequest, NextApiResponse } from "next"
import { Date } from "mongoose"

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
      const getUserDecks = await Deck.find({ createdBy: user })
      res.status(200).json({ success: true, decks: getUserDecks })
    } catch (err) {
      res.status(400).json({ success: false })
    }
  }
}
