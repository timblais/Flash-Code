import { Card, Button, Col, ListGroup, ListGroupItem } from "react-bootstrap"
const CardPreviewCard = ({
  __v,
  key,
  _id,
  answer,
  createdBy,
  createdDate,
  deck,
  dueDate,
  easinessFactor,
  language,
  question,
  repetitionInterval,
  repetitionNumber,
  title,
  totalViews,
  selectCard,
}: {
  __v: number
  key: string
  _id: string
  answer: string
  createdBy: string
  createdDate: string
  deck: string
  dueDate: string
  easinessFactor: number
  language: string
  question: string
  repetitionInterval: number
  repetitionNumber: number
  title: string
  totalViews: number
  selectCard: any
}) => {
  const cardSelected = () => {
    const selectedCard = {
      __v: __v,
      key: key,
      _id: _id,
      answer: answer,
      createdBy: createdBy,
      createdDate: createdDate,
      deck: deck,
      dueDate: dueDate,
      easinessFactor: easinessFactor,
      language: language,
      question: question,
      repetitionInterval: repetitionInterval,
      repetitionNumber: repetitionNumber,
      title: title,
      totalViews: totalViews,
    }
    selectCard(selectedCard)
  }

  return (
    <>
      <Col className="my-2">
        <Card
          className="shadow-md hover:font-semibold hover:shadow-lg"
          role="button"
          onClick={cardSelected}
        >
          <Card.Header className="text-center">{title}</Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item>{`Due Date: ${dueDate}`}</ListGroup.Item>
              <ListGroup.Item>{`Total Views: ${totalViews}`}</ListGroup.Item>
              <ListGroup.Item>{`Language: ${language}`}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}

export default CardPreviewCard
