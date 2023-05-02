import Link from "next/link"

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
  return (
    <div>
      <h3>{deckName}</h3>
      <span>{totalCards} Cards</span>
      <span>Primary Language: {language}</span>
      <span className="w-full text-l my-2 pl-4">
        <Link href={url}>View/Edit</Link>
      </span>
    </div>
  )
}

export default DeckHomePreview
