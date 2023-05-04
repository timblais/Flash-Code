const PageTitle = ({ title }: { title: string }) => {
  return (
    <div className="w-full h-14 flex justify-center items-center shadow-md">
      <h1 className="text-3xl">{title}</h1>
    </div>
  )
}

export default PageTitle
