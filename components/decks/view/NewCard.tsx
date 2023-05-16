import { Button, Modal, Form } from "react-bootstrap"
import { createNewCard } from "@/components/api/apiCalls"
import { useSession } from "next-auth/react"
import { useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { vscodeDark } from "@uiw/codemirror-theme-vscode"
import { EditorView } from "codemirror"
import LanguageOptions from "@/components/LanguageOptions"

const NewCard = ({
  deckId,
  saveAndRefresh,
  language,
}: {
  deckId: string
  saveAndRefresh: any
  language: string
}) => {
  const session = useSession()
  const user = session.data?.user.id || "no user"
  const [enterNewCard, setEnterNewCard] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [cardTitle, setCardTitle] = useState("")
  const [cardLanguage, setCardLanguage] = useState(language)
  const [questionValue, setQuestionValue] = useState("")
  const [answerValue, setAnswerValue] = useState("")

  const handleClick = (event: any) => {
    setEnterNewCard(true)
  }

  const handleSubmit = async (event: any) => {
    const createCard = await createNewCard(
      user,
      cardTitle,
      deckId,
      questionValue,
      answerValue,
      cardLanguage
    )
    setCardTitle("")
    setQuestionValue("")
    setAnswerValue("")
    setCardLanguage(language)
    setEnterNewCard(false)
    setSubmitSuccess(true)
  }

  const anotherNewCard = () => {
    setSubmitSuccess(false)
    setEnterNewCard(true)
  }

  const cancelNewCard = () => {
    setCardTitle("")
    setQuestionValue("")
    setAnswerValue("")
    setCardLanguage(language)
    setEnterNewCard(false)
  }

  const cancelSuccess = () => {
    setSubmitSuccess(false)
    saveAndRefresh()
  }
  return (
    <>
      <div className="w-full h-14 flex justify-center items-center">
        <Button className="mt-2" variant="outline-dark" onClick={handleClick}>
          Create New Card
        </Button>
      </div>

      <Modal
        show={enterNewCard}
        size="lg"
        onHide={cancelNewCard}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create a New Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Card Title</Form.Label>
              <Form.Control
                type="input"
                placeholder="Enter a Title for this Card"
                onChange={(e) => setCardTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Card Language</Form.Label>
              <Form.Select onChange={(e) => setCardLanguage(e.target.value)}>
                <LanguageOptions selectedLanguage={language} />
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <CodeMirror
                height="200px"
                width="100%"
                editable={true}
                extensions={[
                  javascript({ jsx: true }),
                  EditorView.lineWrapping,
                ]}
                theme={vscodeDark}
                onChange={(value) => setQuestionValue(value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Answer</Form.Label>
              <CodeMirror
                height="200px"
                width="100%"
                editable={true}
                extensions={[
                  javascript({ jsx: true }),
                  EditorView.lineWrapping,
                ]}
                theme={vscodeDark}
                onChange={(value) => setAnswerValue(value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelNewCard}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={submitSuccess}
        size="lg"
        onHide={cancelSuccess}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body>
          <h4>Card Saved!</h4>
          <p>Create another new card?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelSuccess}>
            Back
          </Button>
          <Button variant="primary" onClick={anotherNewCard}>
            Create New Card
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default NewCard
