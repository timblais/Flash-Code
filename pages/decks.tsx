import Button from "react-bootstrap/Button"
import { createPage } from "@/components/page"
import { getUserDecks } from "@/components/api/apiCalls"
import { getSession, useSession } from "next-auth/react"
import UserDecksHome from "@/components/decks/home/UserDecksHome"

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  // const user = session.user.id
  // const decks = await getUserDecks(user)

  return {
    props: { session },
  }
}

export default createPage({
  title: "Decks",
  Page: () => {
    return (
      <>
        <div>Hello From Decks</div>
        <UserDecksHome />
      </>
    )
  },
})
