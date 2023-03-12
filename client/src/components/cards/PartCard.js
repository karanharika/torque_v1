import moment from "moment";
import { useNavigate } from "react-router-dom";

export default function PartCard({ p }) {
  const navigate = useNavigate();
  return (
    <div className="card mb-4">
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
    </div>
  );
}
