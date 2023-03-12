import { useState, useEffect } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";
import PartCard from "../components/cards/PartCard";
import { Checkbox, Radio } from "antd";
import { prices } from "../prices";

export default function Inventory() {
  const [categories, setCatrgories] = useState([]);
  const [parts, setParts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

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
    <>
      <Jumbotron
        title="Inventory"
        subTitle="Browse through our parts collection"
      />
      <div className="container-fluid">
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
                  <div key={p._id} style={{ marginLeft: "8px" }}>
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
            <div className="row" style={{ height: "80vh", overflow: "scroll" }}>
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
      </div>
    </>
  );
}
