import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { getCardsToStudy } from "@/components/api/apiCalls"
import PageTitle from "@/components/Title"
import SubHeader from "@/components/subHeader"
import { DeckObject, CardObject } from "@/types/documentTypes"
import { Container, Row, Modal, Button } from "react-bootstrap"
import StudyCard from "./StudyCard"
import Loading from "../../Loading"

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

  const updateCards = () => {}

  // deck and cards due are returned. Next steps: build out display of cards and study workflow.
  if (!returnedDeck) {
    return <Loading />
  }
  return (
    <>
      <PageTitle title={`Studying ${returnedDeck?.title ?? ""}`} />
      <SubHeader text={`${returnedCards.length} Cards Remaining`} />
      <StudyCard card={returnedCards[0]} updateRemaining={updateCards} />
    </>
  )
}

export default ActiveStudy
