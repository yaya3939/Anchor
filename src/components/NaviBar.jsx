import * as React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AnchorIcon from "@mui/icons-material/Anchor";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function NaviBar() {
  const date = new Date();
  let options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "narrow",
  };
  const today = date.toLocaleDateString("ja-JP", options);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">{today}</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">
            <AnchorIcon />
          </Nav.Link>
          <Nav.Link href="#features">
            <CalendarMonthIcon />
          </Nav.Link>
          <Nav.Link href="#pricing">
            <MoreVertIcon />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NaviBar;
