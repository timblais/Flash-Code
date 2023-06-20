import { CardObject } from "@/types/documentTypes"

export const updateCardArray = async (
  remainingCards: CardObject[],
  ratedCard: CardObject
) => {
  let tomorrow = new Date()
  tomorrow.setHours(24, 0, 0, 0)
  remainingCards.shift()
  let nextDue = new Date(ratedCard.dueDate)
  if (nextDue < tomorrow) {
    remainingCards.push(ratedCard)
  }
  return remainingCards
}
