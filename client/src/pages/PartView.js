import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";

export default function PartView() {
  //state
  const [part, setPart] = useState({});

  //hooks
  const params = useParams();

  const loadPart = async (req, res) => {
    try {
      const { data } = await axios.get(`/part/${params.slug}`);
      setPart(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (params?.slug) {
      loadPart();
    }
    // eslint-disable-next-line
  }, [params?.slug]);

  return (
    <div className="container-fluid mt-3">
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}/part/photo/${part._id}`}
            alt={part.name}
            width="200px"
          />
          <div className="card-body">
            <h1 className="fw-bold">{part?.name}</h1>
            <p className="card-text">Description : {part?.description}</p>
            <p>Year : {part?.truckYear}</p>
            <p>Price : ${part?.price}</p>
            <p>In Stock : {part?.quantity}</p>
            <p>Part Number / OEM : {part?.partNumber}</p>
            <p>Part Type : {part?.category?.name}</p>
            <p>Make : {part?.make?.name}</p>
            <p>Model : {part?.model?.name}</p>
            <p>Posted : {moment(part.createdAt).fromNow()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
