import { Card, Button } from "react-bootstrap"
const CardPreviewCard = ({
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
}: {
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
}) => {
  return (
    <>
      <Card>
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          <Card.Text>
            <span className="mr-2">{`Due Date: ${dueDate}`}</span>
            <span className="mr-2">{`Total Views: ${totalViews}`}</span>
            <span className="mr-2">{`Language: ${language}`}</span>
          </Card.Text>
          <Button variant="primary">View Card</Button>
        </Card.Body>
      </Card>
    </>
  )
}

export default CardPreviewCard
