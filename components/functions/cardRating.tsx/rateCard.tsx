import { CardObject } from "@/types/documentTypes"

export const rateCard = async (card: CardObject, grade: number) => {
  let n = card.repetitionNumber
  let I = card.repetitionInterval
  let EF = card.easinessFactor

  // Update EF
  EF = EF + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))
  if (EF < 1.3) {
    EF = 1.3
  }

  // Update n and assign I
  if (grade >= 3) {
    if (n === 0) {
      I = 1
    } else if (n === 1) {
      I = 4
    } else {
      I = Math.floor(I * EF)
    }
    n++
  } else {
    n = 0
    I = 1
  }

  let addSeconds
  if (n === 0) {
    addSeconds = 600
  } else {
    addSeconds = 86400 * I // seconds per day
  }

  let nextDue = Date.now() + addSeconds * 1000 // convert to milliseconds

  card["dueDate"] = new Date(nextDue).toString()
  card["repetitionNumber"] = n
  card["easinessFactor"] = EF
  card["repetitionInterval"] = I
  card["totalViews"]++

  return card
}
