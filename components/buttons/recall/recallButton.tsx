const RecallButton = ({
  weight,
  name,
  onClick,
  width,
  bgColor,
  bgHover,
}: {
  weight: number
  name: string
  onClick: any
  width: string
  bgColor: string
  bgHover: string
}) => {
  return (
    <button
      type="button"
      onClick={() => onClick(weight)}
      className={`${width} flex justify-center items-center text-base p-1 m-1 rounded-md ${bgColor} text-gray-800 ${bgHover} hover:text-white shadow-md`}
    >
      {name}
    </button>
  )
}

export default RecallButton
