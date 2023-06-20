import { CardObject } from "@/types/documentTypes"
import { Accordion } from "react-bootstrap"
import CodeMirror from "@uiw/react-codemirror"
import { vscodeDark } from "@uiw/codemirror-theme-vscode"
import { EditorView } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"
import RecallButtonGroup from "@/components/buttons/recall/recallButtonGroup"

const StudyCard = ({
  card,
  rateAndUpdate,
}: {
  card: CardObject
  rateAndUpdate: any
}) => {
  return (
    <Accordion
      className="flex flex-col justify-start items-center"
      defaultActiveKey={["0"]}
    >
      <Accordion.Item eventKey="0" className="w-full sm:w-4/5 lg:w-3/5">
        <Accordion.Header>Question</Accordion.Header>
        <Accordion.Body>
          <CodeMirror
            height="200px"
            width="100%"
            editable={false}
            extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
            theme={vscodeDark}
            value={card.question}
          />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" className="w-full sm:w-4/5 lg:w-3/5">
        <Accordion.Header>Enter Answer</Accordion.Header>
        <Accordion.Body>
          <CodeMirror
            height="200px"
            width="100%"
            editable={true}
            extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
            theme={vscodeDark}
            value={""}
          />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2" className="w-full sm:w-4/5 lg:w-3/5">
        <Accordion.Header>Show Answer</Accordion.Header>
        <Accordion.Body>
          <CodeMirror
            height="200px"
            width="100%"
            editable={false}
            extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
            theme={vscodeDark}
            value={card.answer}
          />
          <RecallButtonGroup onclick={rateAndUpdate} />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default StudyCard
