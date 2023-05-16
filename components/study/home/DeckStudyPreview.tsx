import { Card, Button } from "react-bootstrap"
import { useRouter } from "next/router"
import { CardObject } from "@/types/documentTypes"

const DeckStudyPreview = ({
  deckId,
  deckName,
  totalCards,
  language,
  cardArray,
}: {
  deckId: string
  deckName: string
  totalCards: number
  language: string
  cardArray: CardObject[]
}) => {
  const url = `/study/deck/${deckId}`
  const { push } = useRouter()
  const handleClick = () => {
    push(url)
  }
  return (
    <Card className="w-4/5 mt-3">
      <Card.Header className="text-2xl">
        {deckName}
        <Button variant="outline-dark" className="mx-4" onClick={handleClick}>
          Study Deck
        </Button>
      </Card.Header>
      <Card.Body>
        <span className="pr-2">{totalCards} Cards</span>
        <span className="pr-2">Primary Language: {language}</span>
      </Card.Body>
    </Card>
  )
}

export default DeckStudyPreview
