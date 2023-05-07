import { CardObject } from "@/types/documentTypes"
import { Modal, Form, Button, Container, Row } from "react-bootstrap"
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from "@uiw/codemirror-theme-vscode"
import { EditorView } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"

const ViewCardModal = ({
  isOpen,
  card,
  setClose,
  setEdit,
}: {
  isOpen: boolean
  card: CardObject
  setClose: any
  setEdit: any
}) => {
  return (
    <>
      <Modal
        show={isOpen}
        onHide={setClose}
        size="lg"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{card.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row xs={2} sm={2}>
            <span className="mb-3">Created Date: {card.createdDate}</span>
            <span className="mb-3">Due Date: {card.dueDate}</span>
            <span className="mb-3">Total Views: {card.totalViews}</span>
            <span className="mb-3">Language: {card.language}</span>
          </Row>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <CodeMirror
                height="200px"
                width="100%"
                editable={false}
                extensions={[
                  javascript({ jsx: true }),
                  EditorView.lineWrapping,
                ]}
                theme={vscodeDark}
                value={card.question}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Answer</Form.Label>
              <CodeMirror
                height="200px"
                width="100%"
                editable={false}
                extensions={[
                  javascript({ jsx: true }),
                  EditorView.lineWrapping,
                ]}
                theme={vscodeDark}
                value={card.answer}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={setClose}>
            Return
          </Button>
          <Button variant="primary" onClick={setEdit}>
            Edit Card
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ViewCardModal
