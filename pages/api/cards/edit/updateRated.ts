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
      const updateRatedCard = await Card.findOneAndUpdate(
        { _id: req.body._id },
        {
          dueDate: req.body.dueDate,
          repetitionNumber: req.body.repetitionNumber,
          easinessFactor: req.body.easinessFactor,
          repetitionInterval: req.body.repetitionInterval,
          totalViews: req.body.totalViews,
        },
        { new: true }
      )
      res.status(200).json({ success: true, data: updateRatedCard })
    } catch (err) {
      res.status(400).json({ success: false })
    }
  }
}
