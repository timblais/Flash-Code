import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"

const NavBar = () => {
  const session = useSession()
  const userName = session.data?.user.name

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
          </Nav>
          <Nav>
            <NavDropdown title={userName}>
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={() => signOut()}>
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default NavBar
