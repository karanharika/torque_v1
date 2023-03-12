import { useAuth } from "../../context/auth";
import { useState, useEffect } from "react";
import AdminMenu from "../../components/nav/AdminMenu";
import Jumbotron from "../../components/cards/Jumbotron";
import MakeForm from "../../components/forms/MakeForm";
import axios from "axios";
import toast from "react-hot-toast";
import { Modal } from "antd";

export default function AdminMake() {
  //context
  const [auth] = useAuth();

  // state
  const [name, setName] = useState("");
  const [makes, setMakes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatingName, setUpdatingName] = useState("");

  useEffect(() => {
    loadMakes();
  }, []);

  const loadMakes = async () => {
    try {
      const { data } = await axios.get("/makes");
      setMakes(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/make", { name });
      if (data?.error) {
        toast.error(data.error);
      } else {
        setName("");
        loadMakes();
        toast.success(`"${data.name}" created successfully`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Make creation failed. Try again.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/make/${selected._id}`, {
        name: updatingName,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.name} is updated`);
        setSelected(null);
        setUpdatingName("");
        loadMakes();
        setVisible(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Make may already exist. Try again.");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(`/make/${selected._id}`);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.name} is deleted`);
        setSelected(null);
        loadMakes();
        setVisible(false);
      }
    } catch (err) {
      console.log(err);
      toast.error(err);
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
              <h4>Manage Makes</h4>
            </div>
            <MakeForm
              value={name}
              setValue={setName}
              handleSubmit={handleSubmit}
            />
            <hr></hr>
            <div className="d-flex">
              {makes?.map((c) => (
                <button
                  key={c._id}
                  className="btn btn-outline-primary m-3"
                  onClick={() => {
                    setVisible(true);
                    setSelected(c);
                    setUpdatingName(c.name);
                  }}
                >
                  {c.name}
                </button>
              ))}
            </div>
            <Modal
              open={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <MakeForm
                value={updatingName}
                setValue={setUpdatingName}
                handleSubmit={handleUpdate}
                buttonText="Update"
                handleDelete={handleDelete}
              />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
