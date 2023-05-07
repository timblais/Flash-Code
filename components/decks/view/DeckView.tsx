import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { getSingleDeck } from "@/components/api/apiCalls"
import PageTitle from "@/components/Title"
import NewCard from "./NewCard"
import CardPreviewCard from "./CardPreviewCard"
import { DeckObject, CardObject } from "@/types/documentTypes"
import { Container, Row, Modal, Button } from "react-bootstrap"
import ViewCardModal from "./ViewCardModal"
import EditCardModal from "./EditCardModal"

const DeckView = () => {
  const router = useRouter()
  const deckId = router.query.deckId as string
  const [returnedDeck, setReturnedDeck] = useState<DeckObject>()
  const [returnedCards, setReturnedCards] = useState<CardObject[]>([])
  const [fetchDetails, setFetchDetails] = useState(0)
  const [targetCard, setTargetCard] = useState<CardObject>({
    __v: 0,
    _id: "default",
    answer: "default",
    createdBy: "default",
    createdDate: "default",
    deck: "default",
    dueDate: "default",
    easinessFactor: 0,
    language: "default",
    question: "default",
    repetitionInterval: 0,
    repetitionNumber: 0,
    title: "default",
    totalViews: 0,
  })
  const [viewCard, setViewCard] = useState(false)
  const [editCard, setEditCard] = useState(false)
  const [savedModal, setSavedModal] = useState(false)
  const cards = []

  useEffect(() => {
    const getDeckDetails = async (deck: string) => {
      const myDeck = await getSingleDeck(deck)
      setReturnedDeck(myDeck.deck)
      setReturnedCards(myDeck.cards)
    }
    getDeckDetails(deckId)
  }, [deckId, fetchDetails])

  const saveAndRefresh = () => {
    setFetchDetails(fetchDetails + 1)
  }

  const applyCardProps = (clickedCard: CardObject) => {
    setTargetCard(clickedCard)
    setViewCard(true)
  }

  const closeModal = () => {
    setViewCard(false)
    setEditCard(false)
  }

  const editModal = () => {
    setViewCard(false)
    setEditCard(true)
  }

  const saveEdit = () => {
    setEditCard(false)
    setSavedModal(true)
  }

  const confirmSaved = () => {
    saveAndRefresh()
    setSavedModal(false)
  }

  for (const card of returnedCards) {
    let createdDate = new Date(card.createdDate).toLocaleDateString("en-US")
    let dueDate = new Date(card.dueDate).toLocaleDateString("en-US")
    cards.push(
      <CardPreviewCard
        __v={card.__v}
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
        selectCard={applyCardProps}
      />
    )
  }

  return (
    <>
      <PageTitle title={returnedDeck?.title ?? ""} />
      <NewCard deckId={deckId} saveAndRefresh={saveAndRefresh} />
      <Container>
        <Row xs={1} md={2} lg={3}>
          {cards}
        </Row>
      </Container>
      <ViewCardModal
        isOpen={viewCard}
        card={targetCard}
        setClose={closeModal}
        setEdit={editModal}
      />
      <EditCardModal
        isOpen={editCard}
        card={targetCard}
        setClose={closeModal}
        saveEdit={saveEdit}
      />
      <Modal
        show={savedModal}
        size="sm"
        onHide={confirmSaved}
        keyboard={false}
        centered
      >
        <Modal.Header>Card Saved!</Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={confirmSaved}>
            Okay
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeckView
