import { createPage } from "@/components/page"
import { getSession } from "next-auth/react"
import StudyHome from "@/components/study/home/StudyHome"

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
  title: "Study",
  Page: () => {
    return (
      <>
        <StudyHome />
      </>
    )
  },
})
