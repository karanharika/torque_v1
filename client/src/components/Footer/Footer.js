import React, { Component } from "react";
// import ModalFooter from "react-bootstrap/ModalFooter";
import Container from "react-bootstrap/Container";
// import MediaQuery from "react-responsive";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
// import { faInstagram } from "@fortawesome/free-solid-svg-icons";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
// import Image from "react-bootstrap/Image";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <Container className="rootFoterContainer">
        <Row className="footerRow">
          <Col>
            <Row>
              <h5>Contact Us</h5>
            </Row>
            <Row>
              <p className="addressText">
                7583 Vantage Pl, <br />
                Delta, BC <br />
                V4G 1A5
              </p>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.google.com/maps/dir//TORQUE+TECH+TRUCK+%26+TRAILER+REPAIR+LTD.,+7583+Vantage+Pl,+Delta,+BC+V4G+1A5/@49.1402581,-123.0086857,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x5485df4ffabd1903:0xdf482484e7c47dfe!2m2!1d-123.0086857!2d49.1402581!3e0"
              >
                <Button className="directionsButton" variant="outline-light">
                  Directions
                </Button>
              </a>
            </Row>
          </Col>

          <Col>
            <Row>
              <h5>Information</h5>
            </Row>
            <Row>
              <a className="noDesignLink" href="/contact">
                Contact Us
              </a>
            </Row>
            <Row>
              <a className="noDesignLink" href="/partfinder">
                Part Finder
              </a>
            </Row>
            <Row>
              <a className="noDesignLink" href="/#about">
                About Us
              </a>
            </Row>
            <Row>
              <a className="noDesignLink" href="tel:+16044981462">
                <Button className="footerCallButton" variant="outline-light">
                  Call
                </Button>
              </a>
            </Row>
          </Col>

          <Col>
            <Row>
              <h5>Business Hours</h5>
            </Row>
            <Row>
              <p>
                Monday - Friday: 9am to 8pm
                <br />
                Saturday: 9am to 4pm
                <br />
                Sunday: Closed
              </p>
            </Row>
          </Col>
        </Row>

        <Row className="copyrightRow">
          <p>&#169; 2023 TORQUE TECH TRUCK & TRAILER REPAIR LTD.</p>
        </Row>
      </Container>
    );
  }
}

export default Footer;
