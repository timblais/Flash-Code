const SubHeader = ({ text }: { text: string }) => {
  return (
    <div className="w-full h-14 flex justify-center items-center">
      <h3 className="text-xl">{text}</h3>
    </div>
  )
}

export default SubHeader
