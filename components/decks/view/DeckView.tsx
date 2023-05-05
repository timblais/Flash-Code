import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { getSingleDeck } from "@/components/api/apiCalls"
import PageTitle from "@/components/Title"
import NewCard from "./NewCard"
import { DeckObject } from "@/types/documentTypes"
const DeckView = () => {
  const router = useRouter()
  const deckId = router.query.deckId as string
  const [returnedDeck, setReturnedDeck] = useState<DeckObject>()
  const [returnedCards, setReturnedCards] = useState([])
  const [fetchDetails, setFetchDetails] = useState(0)

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
  // next step: set up get request to pull cards for the deck and display them

  return (
    <>
      <PageTitle title={returnedDeck?.title ?? ""} />
      <NewCard deckId={deckId} saveAndRefresh={saveAndRefresh} />
    </>
  )
}

export default DeckView
