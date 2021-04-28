import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const TopNav = (props) => {
    return (
      <Navbar collapseOnSelect className="navbar" fixed="top" expand="lg" bg="dark" variant="dark" props={props}>
        <Navbar.Brand href="#home">footyForecast</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#features">MyAccount</Nav.Link>
  
            <NavDropdown title="League" id="collasible-nav-dropdown" onSelect={props.changeFunc}>
              <NavDropdown.Item href="#action/3.1" eventKey={39}>Premier League</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2" eventKey={40}>Championship</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3" eventKey={41}>League One</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4" eventKey={42}>League Two</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.5" eventKey={140}>La Liga</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.6" eventKey={135}>Seria A</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.7" eventKey={78}>Bundesliga</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.8" eventKey={61}>French Ligue 1</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">More Leagues</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#pricing">Trending</Nav.Link>
            <Nav.Link href="#deets">My Games</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              About
        </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

