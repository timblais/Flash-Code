import { useState } from "react"
import { useSession } from "next-auth/react"
import { createNewDeck } from "@/components/api/apiCalls"
import { Modal, Button, Form } from "react-bootstrap"

const NewDeck = ({ deckRefresh }: { deckRefresh: any }) => {
  const session = useSession()
  const user = session.data?.user.id || "no user"
  const [enterNewDeck, setEnterNewDeck] = useState(false)
  const [deckTitle, setDeckTitle] = useState("")
  const [language, setLanguage] = useState("Javascript")

  const handleClick = (event: any) => {
    setEnterNewDeck(true)
  }

  const handleSubmit = async (event: any) => {
    const createDeck = await createNewDeck(user, deckTitle, language)
    setEnterNewDeck(false)
    deckRefresh()
  }

  const handleCancel = () => {
    setEnterNewDeck(false)
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <Button className="mt-2" variant="outline-dark" onClick={handleClick}>
          Create New Deck
        </Button>
      </div>

      <Modal
        show={enterNewDeck}
        onHide={handleCancel}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a New Deck</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Deck Title</Form.Label>
              <Form.Control
                type="input"
                placeholder="Enter a Title for this Deck"
                onChange={(e) => setDeckTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Deck Language</Form.Label>
              <Form.Select onChange={(e) => setLanguage(e.target.value)}>
                <option value="Javascript">Javascript</option>
                <option value="Typescript">Typescript</option>
                <option value="Python">Python</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default NewDeck
