import Link from "next/link"
import { Card, Button } from "react-bootstrap"
import { useRouter } from "next/router"

const DeckHomePreview = ({
  deckId,
  deckName,
  totalCards,
  language,
}: {
  deckId: string
  deckName: string
  totalCards: number
  language: string
}) => {
  const url = `/decks/view/${deckId}`
  const { push } = useRouter()
  const handleClick = () => {
    push(url)
  }
  return (
    <Card className="w-4/5 mt-3">
      <Card.Header className="text-2xl">
        {deckName}
        <Button variant="outline-dark" className="mx-4" onClick={handleClick}>
          View Deck
        </Button>
      </Card.Header>
      <Card.Body>
        <span className="pr-2">{totalCards} Cards</span>
        <span className="pr-2">Primary Language: {language}</span>
      </Card.Body>
    </Card>
  )
}

export default DeckHomePreview
