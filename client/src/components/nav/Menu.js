import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button } from "antd";

export default function Menu() {
  //context
  const [auth, setAuth] = useAuth();
  //hook
  const navigate = useNavigate();
  const categories = useCategory();

  //console.log("categories => ", categories);

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand className="text-yellow">
            TORQUE TECH TRUCK & TRAILER REPAIR LTD.
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/gallery">Gallery</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
              <Nav.Link href="/inventory">Inventory</Nav.Link>
              <NavDropdown
                style={{ lineHeight: "25px" }}
                title="Categories"
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item href="/categories">
                  All Categories
                </NavDropdown.Item>
                <NavDropdown.Divider />
                {categories?.map((c) => (
                  <NavDropdown.Item key={c._id} href={`/category/${c.slug}`}>
                    {c.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
              {auth?.user ? (
                <NavDropdown
                  title={auth?.user?.name}
                  id="navbarScrollingDropdown"
                  style={{ lineHeight: "25px" }}
                >
                  <NavDropdown.Item
                    href={`/dashboard/${
                      auth?.user.role === 1 ? "admin" : "user"
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
    </>
  );
}
