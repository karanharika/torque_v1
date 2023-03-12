import React, { Component, useState, useRef } from "react";
// import React from "react";
import "./Home.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Image from "react-bootstrap/Image";
import { InputGroup } from "react-bootstrap";
import HomeImage from "../../assets/images/homepage.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Carousel from "react-bootstrap/Carousel";
import GalImage1 from "../../assets/images/gallery/gal1.jpg";
import GalImage2 from "../../assets/images/gallery/gal2.jpg";
import GalImage3 from "../../assets/images/gallery/gal3.jpg";
import GalImage4 from "../../assets/images/gallery/gal4.jpg";
import GalImage5 from "../../assets/images/gallery/gal5.jpg";
import GalImage6 from "../../assets/images/gallery/gal6.jpg";
import GalImage7 from "../../assets/images/gallery/gal7.jpg";
import GalImage8 from "../../assets/images/gallery/gal8.jpg";
import GalImage9 from "../../assets/images/gallery/gal9.jpg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function Home() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Make sure that you avoid including any sensitive information that you
      don't want to share with this business.
    </Tooltip>
  );

  return (
    <Container className="rootContainer">
      {/* <h1>Home page</h1> */}

      <Container className="homepageImageContainer">
        <Image src={HomeImage} className="homepageImage"></Image>

        <h1 className="homepageImageTitle">
          Exceptional service that keep the journey going.
        </h1>

        <Container className="omnisearchContainer">
          <Row>
            <Col sm={9} className="omnisearchCol">
              <FloatingLabel
                controlId="floatingTextarea"
                label="Enter a Keyword or Part Number"
                className="mb-3 omnisearch"
              >
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2 omnisearchField"
                  aria-label="Enter a Keyword or Part Number"
                  aria-describedby="basic-addon2"
                />
              </FloatingLabel>
            </Col>

            <Col sm={3} className="omnisearchCol">
              <Button className="omnisearchButton" variant="success">
                Search
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>

      <Container className="testimonialsContainer">
        <Row>
          <h3 className="headingCenter">Testimonials</h3>
        </Row>
        <Row>
          <Col md={4}>
            <h6>Raj S</h6>
            <FontAwesomeIcon className="starColor" icon={faStar} />
            <FontAwesomeIcon className="starColor" icon={faStar} />
            <FontAwesomeIcon className="starColor" icon={faStar} />
            <FontAwesomeIcon className="starColor" icon={faStar} />
            <FontAwesomeIcon className="starColor" icon={faStar} />
            <p>
              "Nice people and price is very competitive. Especially, Jag(owner)
              is quite skilled and awesome guy. Highly recommend"
            </p>
          </Col>
          <Col md={4}>
            <h6>Mike C</h6>
            <FontAwesomeIcon className="starColor" icon={faStar} />
            <FontAwesomeIcon className="starColor" icon={faStar} />
            <FontAwesomeIcon className="starColor" icon={faStar} />
            <FontAwesomeIcon className="starColor" icon={faStar} />
            <FontAwesomeIcon className="starColor" icon={faStar} />
            <p>
              Got my MVI done here for my semi truck. They were fast, and the
              price was very competitive. Will definitely be going here to get
              my MVI and other services done."
            </p>
          </Col>
          <Col md={4}>
            <h6>Won M</h6>
            <FontAwesomeIcon className="starColor" icon={faStar} />
            <FontAwesomeIcon className="starColor" icon={faStar} />
            <FontAwesomeIcon className="starColor" icon={faStar} />
            <FontAwesomeIcon className="starColor" icon={faStar} />
            <FontAwesomeIcon className="starColor" icon={faStar} />
            <p>"Very good service"</p>
          </Col>
        </Row>

        <Row className="justify-content-md-center">
          <Col md={2}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://search.google.com/local/writereview?placeid=ChIJAxm9-k_fhVQR_n3E54QkSN8"
            >
              <Button className="reviewButton" variant="success">
                Write a Review
              </Button>
            </a>
          </Col>
          <Col md={2}>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://search.google.com/local/reviews?placeid=ChIJAxm9-k_fhVQR_n3E54QkSN8"
            >
              <Button className="reviewButton" variant="success">
                Read More
              </Button>
            </a>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <h3 className="headingCenter">Gallery</h3>
        </Row>
        <Row>
          <Carousel>
            <Carousel.Item>
              <Image src={GalImage1} className="carouselImages"></Image>
            </Carousel.Item>
            <Carousel.Item>
              <Image src={GalImage2} className="carouselImages"></Image>
            </Carousel.Item>
            <Carousel.Item>
              <Image src={GalImage3} className="carouselImages"></Image>
            </Carousel.Item>
            <Carousel.Item>
              <Image src={GalImage4} className="carouselImages"></Image>
            </Carousel.Item>
            <Carousel.Item>
              <Image src={GalImage5} className="carouselImages"></Image>
            </Carousel.Item>
            <Carousel.Item>
              <Image src={GalImage6} className="carouselImages"></Image>
            </Carousel.Item>
            <Carousel.Item>
              <Image src={GalImage7} className="carouselImages"></Image>
            </Carousel.Item>
            <Carousel.Item>
              <Image src={GalImage8} className="carouselImages"></Image>
            </Carousel.Item>
            <Carousel.Item>
              <Image src={GalImage9} className="carouselImages"></Image>
            </Carousel.Item>
          </Carousel>
        </Row>
      </Container>

      <Container>
        <Row>
          <h3 className="headingCenter">Get Quote</h3>
        </Row>

        <Row>
          <Form
            className="centerFormcontrol"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your name"
                  // defaultValue="Mark"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please enter you name.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="email"
                    placeholder="example@email.com"
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                <Form.Label>Phone (optoinal)</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="tel"
                    placeholder="+1 604 xxx xxxx"
                    aria-describedby="inputGroupPrepend"
                  />
                  <Form.Control.Feedback>
                    Phone number is optional.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} md="8" controlId="validationCustom01">
                <Form.Label>Request/Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  required
                  type="text"
                  placeholder="I was wondering about availability and rates. I need help with following:"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please type your request.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3">
              <Row>
                <Col md={3}>
                  <Form.Check
                    required
                    label="Agree to terms and conditions"
                    feedback="You must agree before submitting."
                    feedbackType="invalid"
                  />
                </Col>
                <Col md={1}>
                  <OverlayTrigger
                    placement="right"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                  >
                    <FontAwesomeIcon className="" icon={faCircleInfo} />
                  </OverlayTrigger>
                </Col>
              </Row>
            </Form.Group>

            <Button variant="success" type="submit">
              Submit form
            </Button>
          </Form>
        </Row>
      </Container>
    </Container>
  );
}
export default Home;
