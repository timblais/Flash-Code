import RecallButton from "./recallButton"

const RecallButtonGroup = ({ onclick }: { onclick: any }) => {
  return (
    <section className="w-full flex justify-center items-center flex-wrap mt-3">
      <div className="flex jusfity-end items-center">
        <RecallButton
          key={0}
          weight={0}
          onClick={onclick}
          name={"Zero"}
          bgColor={"bg-red-500"}
          bgHover={"hover:bg-red-600"}
          width={"w-20"}
        />
        <RecallButton
          key={1}
          weight={1}
          onClick={onclick}
          name={"Bad"}
          bgColor={"bg-red-400"}
          bgHover={"hover:bg-red-600"}
          width={"w-20"}
        />
        <RecallButton
          key={2}
          weight={2}
          onClick={onclick}
          name={"Almost"}
          bgColor={"bg-red-300"}
          bgHover={"hover:bg-red-600"}
          width={"w-20"}
        />
      </div>
      <div className="flex jusfity-start items-center">
        <RecallButton
          key={3}
          weight={3}
          onClick={onclick}
          name={"Okay"}
          bgColor={"bg-emerald-300"}
          bgHover={"hover:bg-emerald-600"}
          width={"w-20"}
        />
        <RecallButton
          key={4}
          weight={4}
          onClick={onclick}
          name={"Good"}
          bgColor={"bg-emerald-400"}
          bgHover={"hover:bg-emerald-600"}
          width={"w-20"}
        />
        <RecallButton
          key={5}
          weight={5}
          onClick={onclick}
          name={"Perfect"}
          bgColor={"bg-emerald-500"}
          bgHover={"hover:bg-emerald-600"}
          width={"w-20"}
        />
      </div>
    </section>
  )
}

export default RecallButtonGroup
