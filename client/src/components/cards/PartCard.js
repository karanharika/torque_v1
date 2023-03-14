import moment from "moment";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import "./PartCard.css";

export default function PartCard({ p }) {
  const navigate = useNavigate();
  return (

    <Container>

      <Card bg="dark" className="partsCardStyle" >
        <Card.Img
          variant="top"
          src={`${process.env.REACT_APP_API}/part/photo/${p._id}`}
          alt={p.name}
          style={{ height: "200px", objectFit: "cover" }} />
        <Card.Body>

          <Card.Title>{p.name}</Card.Title>
          <Card.Text>
            {p?.description?.substring(0, 60)}
          </Card.Text>
          <Card.Text>
            Year: {p.truckYear}
          </Card.Text>
          <Card.Footer>
            <Card.Text>
              {moment(p.createdAt).fromNow()}
            </Card.Text>
          </Card.Footer>
          <Button variant="outline-light" className="directionsButton" onClick={() => navigate(`/part/${p.slug}`)}>View Details</Button>
        </Card.Body>
      </Card>

      {/* <div className="card mb-4">
        <img
          src={`${process.env.REACT_APP_API}/part/photo/${p._id}`}
          alt={p.name}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5>{p.name}</h5>
          <p className="card-text">{p?.description?.substring(0, 60)}</p>
          <p>Year : {p.truckYear}</p>
          <p>{moment(p.createdAt).fromNow()}</p>
        </div>
        <button
          className="btn btn-primary col card-button"
          onClick={() => navigate(`/part/${p.slug}`)}
        >
          View Details
        </button>
      </div> */}

    </Container>

  );
}
