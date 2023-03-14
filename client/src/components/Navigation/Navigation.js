import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Image } from "react-bootstrap";
import HomeLogo from "../../assets/logos/navLogo.png";
import Button from "react-bootstrap/Button";

function Navigation() {

  //context
  const [auth, setAuth] = useAuth();
  //hook
  const navigate = useNavigate();
  // const categories = useCategory();

  //console.log("categories => ", categories);

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        {/* <Navbar.Brand className="logoHome" href="/">Torque Tech Truck & Trailer Repair</Navbar.Brand> */}
        <Navbar.Brand href="/">
          <Image className="logoHome" src={HomeLogo}></Image>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/inventory">Parts Inventory</Nav.Link>
            {/* <Nav.Link href="#shipping">Shipping</Nav.Link>
            <NavDropdown title="Services" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Service</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another Service
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated Service
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
            <Nav.Link href="/contact">Contact Us</Nav.Link>


            {auth?.user ? (
              <NavDropdown
                title={auth?.user?.name}
                id="navbarScrollingDropdown"
                style={{ lineHeight: "25px" }}
              >
                <NavDropdown.Item
                  href={`/dashboard/${auth?.user.role === 1 ? "admin" : "user"
                    }`}
                >
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Button onClick={logout}>Logout</Button>
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <></>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
