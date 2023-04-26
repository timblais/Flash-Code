import { useSession } from "next-auth/react"
import { createPage } from "../components/page"

export default createPage({
  title: "Dashboard",
  Page: () => {
    const session = useSession()
    console.log(session)
    return <div>Hello From Dashboard</div>
  },
})
