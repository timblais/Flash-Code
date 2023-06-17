import { Spinner } from "react-bootstrap"

const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loading
