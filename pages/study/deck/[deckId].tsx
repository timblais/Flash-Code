import { createPage } from "@/components/page"
import { getSession } from "next-auth/react"
import ActiveStudy from "@/components/study/active/ActiveStudy"

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
        <ActiveStudy />
      </>
    )
  },
})
