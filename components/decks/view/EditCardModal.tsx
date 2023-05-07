import { CardObject } from "@/types/documentTypes"
import { Modal, Form, Button, Container, Row } from "react-bootstrap"
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from "@uiw/codemirror-theme-vscode"
import { EditorView } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { useState, useEffect } from "react"
import LanguageOptions from "@/components/LanguageOptions"
import { editCard } from "@/components/api/apiCalls"
import { editResetCard } from "@/components/api/apiCalls"

const EditCardModal = ({
  isOpen,
  card,
  setClose,
  saveEdit,
}: {
  isOpen: boolean
  card: CardObject
  setClose: any
  saveEdit: any
}) => {
  const [cardTitle, setCardTitle] = useState(card.title)
  const [cardLanguage, setCardLanguage] = useState(card.language)
  const [questionValue, setQuestionValue] = useState(card.question)
  const [answerValue, setAnswerValue] = useState(card.answer)

  useEffect(() => {
    setCardTitle(card.title)
    setCardLanguage(card.language)
    setQuestionValue(card.question)
    setAnswerValue(card.answer)
  }, [card])

  const handleSave = () => {
    editCard(card._id, cardTitle, questionValue, answerValue, cardLanguage)
    saveEdit()
  }

  const handleSaveReset = () => {
    editResetCard(card._id, cardTitle, questionValue, answerValue, cardLanguage)
    saveEdit()
  }

  return (
    <Modal
      show={isOpen}
      size="lg"
      onHide={setClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Card Title</Form.Label>
            <Form.Control
              type="input"
              defaultValue={card.title}
              onChange={(e) => setCardTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Card Language</Form.Label>
            <Form.Select onChange={(e) => setCardLanguage(e.target.value)}>
              <LanguageOptions selectedLanguage={card.language} />
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Question</Form.Label>
            <CodeMirror
              height="200px"
              width="100%"
              editable={true}
              extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
              theme={vscodeDark}
              onChange={(value) => setQuestionValue(value)}
              value={card.question}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Answer</Form.Label>
            <CodeMirror
              height="200px"
              width="100%"
              editable={true}
              extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
              theme={vscodeDark}
              onChange={(value) => setAnswerValue(value)}
              value={card.answer}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={setClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="primary" onClick={handleSaveReset}>
          Save and Reset Stats
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditCardModal
