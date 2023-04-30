import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const { query: { id }, method } = req
  const { id } = req.query
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.send({
      error: "You must be logged in to access this content.",
    })
  }
  const setId = id as string[]
  if (id) {
    res.status(200).json({ success: true, data: id })
  }

  // switch (id) {
  //   case "GET":
  //     try {
  //       const newDeck = await Deck.create({
  //         createdBy: req.body.user,
  //         createdDate: new Date(),
  //         title: req.body.deckTitle,
  //         language: req.body.language,
  //         totalCards: 0,
  //       })
  //       res.status(201).json({ success: true, data: newDeck })
  //     } catch (err) {
  //       res.status(400).json({ success: false })
  //     }
  // }
}
