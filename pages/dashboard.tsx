import { useSession } from "next-auth/react"
import { createPage } from "../components/page"
import dbConnect from "@/lib/dbConnect"

export default createPage({
  title: "Dashboard",
  Page: () => {
    const session = useSession()
    console.log(session)
    return <div>Hello From Dashboard</div>
  },
})
