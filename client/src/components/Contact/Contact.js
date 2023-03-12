import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Image from "react-bootstrap/Image";
import "./Contact.css";
// import { InputGroup } from "react-bootstrap";

function Contact() {
  return (
    <Container>
      <Container>
        <Row className="mapBox">
          <Col sm={6}>
            <iframe
              className="navigationMap"
              title="Directions Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2610.177296827953!2d-123.01087438406307!3d49.14025807931601!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485df4ffabd1903%3A0xdf482484e7c47dfe!2sTORQUE%20TECH%20TRUCK%20%26%20TRAILER%20REPAIR%20LTD.!5e0!3m2!1sen!2sca!4v1677652819007!5m2!1sen!2sca"

              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">

            </iframe>
          </Col>
          <Col sm={6}>
            <Row><h5 className="addressHeading">Located at</h5></Row>
            <Row><p className="navAddressText">
              7583 Vantage Pl,
              Delta, BC
              V4G 1A5
            </p></Row>
            <Row>
              <a
                className="navButton"
                target="_blank"
                rel="noreferrer"
                href="https://www.google.com/maps/dir//TORQUE+TECH+TRUCK+%26+TRAILER+REPAIR+LTD.,+7583+Vantage+Pl,+Delta,+BC+V4G+1A5/@49.1402581,-123.0086857,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x5485df4ffabd1903:0xdf482484e7c47dfe!2m2!1d-123.0086857!2d49.1402581!3e0">
                <Button className="" variant="success">Directions</Button>
              </a>
            </Row>


            <Row><h5 className="addressHeading">Reach us at</h5></Row>
            <Row><p className="navAddressText">
              +1 (604) 498-1462
            </p></Row>
            <Row>
              <a
                className="navButton"
                href="tel:+16044981462">
                <Button className="" variant="success">Call</Button>
              </a>
            </Row>


          </Col>
        </Row>

        {/* <h2>We are located in the Lower Mainland region of British Columbia, Canada, as part of Greater Vancouver.</h2> */}
      </Container>
    </Container>
  );
}

export default Contact;
