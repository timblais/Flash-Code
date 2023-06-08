import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { getCardsToStudy } from "@/components/api/apiCalls"
import PageTitle from "@/components/Title"
import { DeckObject, CardObject } from "@/types/documentTypes"
import { Container, Row, Modal, Button } from "react-bootstrap"

const ActiveStudy = () => {
  const router = useRouter()
  const deckId = router.query.deckId as string
  const [returnedDeck, setReturnedDeck] = useState<DeckObject>()
  const [returnedCards, setReturnedCards] = useState<CardObject[]>([])

  useEffect(() => {
    const getStudyCards = async (deck: string) => {
      const response = await getCardsToStudy(deck)
      console.log(response)
      setReturnedDeck(response.deck)
      setReturnedCards(response.cards)
    }
    getStudyCards(deckId)
  }, [deckId])

  // deck and cards due are returned. Next steps: build out display of cards and study workflow.

  return (
    <>
      <div>active study here</div>
    </>
  )
}

export default ActiveStudy
