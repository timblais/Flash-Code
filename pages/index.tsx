import Button from "react-bootstrap/Button"
import { getSession, useSession, signIn, signOut } from "next-auth/react"

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

export default function Home() {
  return (
    <>
      <Button onClick={() => signIn()}>Sign In</Button>
      <Button onClick={() => signIn()}>Sign Up</Button>
    </>
  )
}
