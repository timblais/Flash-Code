import { Navbar, Container, Nav, Button } from "react-bootstrap"
import { signOut } from "next-auth/react"

const NavBar = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="sm" className="px-4">
        <Navbar.Brand href="/dashboard">FLASH/CODE</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/decks">Decks</Nav.Link>
            <Nav.Link href="/study">Study</Nav.Link>
            <Button onClick={() => signOut()}>Sign Out</Button>
          </Nav>
          <Nav>
            <Nav.Link href="/dashboard">Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default NavBar
