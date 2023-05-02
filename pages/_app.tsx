import "@/styles/globals.css"
import "bootstrap/dist/css/bootstrap.min.css"
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { applyLayout, AppPropsWithLayout } from "../components/page"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  return (
    <SessionProvider session={session}>
      {applyLayout({ Component, ...pageProps })}
    </SessionProvider>
  )
}
