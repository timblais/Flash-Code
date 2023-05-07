import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]"
import dbConnect from "../../../../lib/dbConnect"
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

  if (method === "PUT") {
    try {
      const editCard = await Card.findOneAndUpdate(
        { _id: req.body._id },
        {
          title: req.body.cardTitle,
          question: req.body.question,
          answer: req.body.answer,
          language: req.body.language,
        },
        { new: true }
      )
      res.status(200).json({ success: true, data: editCard })
    } catch (err) {
      res.status(400).json({ success: false })
    }
  }
}
