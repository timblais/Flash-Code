import Head from "next/head"
// import { Header } from "./Header";
// import { Footer } from "./footer";
import { ReactNode } from "react"
import NavBar from "./navbar"

export type LayoutProps = {
  title?: string
  children?: ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{`${title ? title + " | " : ""}FLASH/CODE`}</title>
      </Head>
      <NavBar />
      <main>{children}</main>
    </>
  )
}
