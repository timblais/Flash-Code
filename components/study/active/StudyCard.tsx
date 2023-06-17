import { CardObject } from "@/types/documentTypes"
import { Accordion } from "react-bootstrap"
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from "@uiw/codemirror-theme-vscode"
import { EditorView } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"

const StudyCard = ({
  card,
  updateRemaining,
}: {
  card: CardObject
  updateRemaining: any
}) => {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Question</Accordion.Header>
        <Accordion.Body>
          <div className="w-full lg:w-4/5">
            <CodeMirror
              height="200px"
              width="100%"
              editable={false}
              extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
              theme={vscodeDark}
              value={card.question}
            />
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default StudyCard
