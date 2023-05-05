import { createPage } from "@/components/page"
import { getSession } from "next-auth/react"
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

  return {
    props: { session },
  }
}

export default createPage({
  title: "Decks",
  Page: () => {
    return (
      <>
        <UserDecksHome />
      </>
    )
  },
})
