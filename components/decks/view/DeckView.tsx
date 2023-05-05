import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { getSingleDeck } from "@/components/api/apiCalls"
import PageTitle from "@/components/Title"
import NewCard from "./NewCard"
import CardPreviewCard from "./CardPreviewCard"
import { DeckObject, CardObject } from "@/types/documentTypes"
const DeckView = () => {
  const router = useRouter()
  const deckId = router.query.deckId as string
  const [returnedDeck, setReturnedDeck] = useState<DeckObject>()
  const [returnedCards, setReturnedCards] = useState<CardObject[]>([])
  const [fetchDetails, setFetchDetails] = useState(0)
  const cards = []

  useEffect(() => {
    const getDeckDetails = async (deck: string) => {
      const myDeck = await getSingleDeck(deck)
      console.log(myDeck)
      setReturnedDeck(myDeck.deck)
      setReturnedCards(myDeck.cards)
    }
    getDeckDetails(deckId)
  }, [deckId, fetchDetails])

  const saveAndRefresh = () => {
    setFetchDetails(fetchDetails + 1)
  }

  for (const card of returnedCards) {
    let createdDate = new Date(card.createdDate).toLocaleString("en-US")
    let dueDate = new Date(card.dueDate).toLocaleString("en-US")
    cards.push(
      <CardPreviewCard
        key={card._id}
        _id={card._id}
        answer={card.answer}
        createdBy={card.createdBy}
        createdDate={createdDate}
        deck={card.deck}
        dueDate={dueDate}
        easinessFactor={card.easinessFactor}
        language={card.language}
        question={card.question}
        repetitionInterval={card.repetitionInterval}
        repetitionNumber={card.repetitionNumber}
        title={card.title}
        totalViews={card.totalViews}
      />
    )
  }
  // next step: set up get request to pull cards for the deck and display them

  return (
    <>
      <PageTitle title={returnedDeck?.title ?? ""} />
      <NewCard deckId={deckId} saveAndRefresh={saveAndRefresh} />
      {cards}
    </>
  )
}

export default DeckView
