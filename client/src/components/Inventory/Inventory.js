import { useState, useEffect } from "react";
// import Jumbotron from "../cards/Jumbotron";
import axios from "axios";
import PartCard from "../cards/PartCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import { Checkbox, Radio } from "antd";
// import { prices } from "../../prices";
import "./Inventory.css";

export default function Inventory() {
  const [categories, setCatrgories] = useState([]);
  const [parts, setParts] = useState([]);
  const [checked, setChecked] = useState([]);
  let [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const prices = [
    { id: 0, name: "Any", array: [] },
    { id: 1, name: "$0 to $49", array: [0, 49] },
    { id: 2, name: "$50 to $99", array: [50, 99] },
    { id: 3, name: "$100 to $149", array: [100, 149] },
    { id: 4, name: "$150 to $299", array: [150, 299] },
    { id: 5, name: "$300 & Above", array: [300, 9999] },
  ];

  useEffect(() => {
    if (!checked.length && !radio.length) {
      loadParts();
      getTotal();
    }
    // eslint-disable-next-line
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    if (checked.length || radio.length) {
      loadFilteredParts();
    }
    // eslint-disable-next-line
  }, [checked, radio]);

  const loadFilteredParts = async () => {
    try {
      console.log("Original from Radio:", radio, typeof (radio));
      // let arr = JSON.parse("[" + radio + "]");
      radio = JSON.parse("[" + radio + "]");

      console.log("After PARSE:", radio, typeof (radio));

      const { data } = await axios.post("/filtered-parts", { checked, radio });
      console.log("filtered products => ", data);
      setParts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadParts = async () => {
    try {
      const { data } = await axios.get(`/list-parts/${page}`);
      setParts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/list-parts/${page}`);
      setParts([...parts, ...data]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCatrgories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheck = (value, id) => {
    console.log(value, id);
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/parts-count");
      setTotal(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (


    <Container className="rootContainer">
      <h3 className="headingCenter">Browse our Inventory</h3>
      <Container className="marginControl">
        <Row>

          <Col md={3}>
            <Row>
              <Row className="filteringRows">
                <h5>Filter By Categories</h5>

                {categories?.map((c) => (
                  <Form.Check
                    type='checkbox'
                    key={c._id}
                    onChange={(e) => handleCheck(e.target.checked, c._id)}
                    id='category-checkbox'
                    label={c.name}
                  />
                ))}
              </Row>
              <Row className="filteringRows">
                <h5>Filter By Price</h5>

                {prices?.map((p) => (
                  <Form.Check
                    type='radio'
                    name="prices"
                    key={p._id}
                    onChange={(e) => setRadio(e.target.value)}
                    value={p.array}
                    id={p._id}
                    label={p.name}
                  />

                ))}
              </Row>

              <Row className="filteringRows">
                <Button
                  variant="success"
                  onClick={() => window.location.reload()}>Reset</Button>
              </Row>

            </Row>
          </Col>


          <Col md={9}>

            <Row className="partsDisplayRow">
              {parts?.map((p) => (
                <Col md={4} key={p._id}>
                  <PartCard p={p} />
                </Col>
              ))}
            </Row>

          </Col>
        </Row>
      </Container>

      {/* <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <h2 className="p-3 mt-2 mb-2 h4 bg-lighjt text-center">
              Filter by Categories
            </h2>
            <div className="row p-5">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleCheck(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <h2 className="p-3 mt-2 mb-2 h4 bg-lighjt text-center">
              Filter by Price
            </h2>
            <div className="row p-5">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>

            <div className="p-5 pt-0">
              <button
                className="btn btn-outline-secondary col-12"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>
          <div className="col-md-9">
            <h2 className="p-3 mt-2 mb-2 h4 bg-lighjt text-center">
              Available Parts
            </h2>
            <div className="row" >
              {parts?.map((p) => (
                <div className="col-md-4" key={p._id}>
                  <PartCard p={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="container text-center p-5">
          {parts && parts.length < total && (
            <button
              className="btn btn-warning bt-lg col-md-6"
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "loading..." : "Load more"}
            </button>
          )}
        </div>
      </div> */}


    </Container>


  );
}
