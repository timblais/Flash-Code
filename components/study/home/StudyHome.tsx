import PageTitle from "@/components/Title"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { getUserDecksWithCardsDue } from "@/components/api/apiCalls"
import DeckStudyPreview from "./DeckStudyPreview"
import {
  DecksWithCardsObject,
  DeckObject,
  CardObject,
} from "@/types/documentTypes"

const StudyHome = () => {
  const session = useSession()
  const user = session.data?.user.id || "no user"

  const [returnedDecksWithCards, setReturnedDecksWithCards] =
    useState<DecksWithCardsObject>()
  const deckAndCardsPreviews: any[] = []
  console.log(returnedDecksWithCards)

  // fetch decks from db
  useEffect(() => {
    const getDecksandCards = async (user: string) => {
      const dbDecks = await getUserDecksWithCardsDue(user)
      const decksObject: DecksWithCardsObject = dbDecks.decks
      setReturnedDecksWithCards(decksObject)
    }
    getDecksandCards(user)
  }, [user])

  if (returnedDecksWithCards) {
    for (const [deck, value] of Object.entries(returnedDecksWithCards)) {
      deckAndCardsPreviews.push(
        <DeckStudyPreview
          key={deck}
          deckId={deck}
          deckName={value.deck.title}
          totalCards={value.deck.totalCards}
          language={value.deck.language}
          cardArray={value.cards}
        />
      )
    }
  }

  return (
    <>
      <PageTitle title={"Study"} />
      <div>Study Home Page</div>
      {deckAndCardsPreviews}
    </>
  )
}

export default StudyHome
