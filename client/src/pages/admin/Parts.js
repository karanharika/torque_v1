import Jumbotron from "../../components/cards/Jumbotron";
import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/nav/AdminMenu";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

export default function AdminParts() {
  // context
  const [auth] = useAuth();
  // state
  const [parts, setParts] = useState([]);

  useEffect(() => {
    loadParts();
  }, []);

  const loadParts = async () => {
    try {
      const { data } = await axios.get("/parts");
      setParts(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subTitle="Welcom to Admin Dashboard"
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 bg-light">
              <h4>manage your parts here</h4>
            </div>
            {parts?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/part/update/${p.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={`${process.env.REACT_APP_API}/part/photo/${p._id}`}
                        className="img img-fluid rounded-start"
                        alt={p.name}
                        width={250}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">
                          {p?.description?.substring(0, 160)}...
                        </p>
                        <p className="card-text">
                          <small className="text-muted">
                            {moment(p.createdAt).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
