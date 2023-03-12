import { useAuth } from "../../context/auth";
import { useState, useEffect } from "react";
import AdminMenu from "../../components/nav/AdminMenu";
import Jumbotron from "../../components/cards/Jumbotron";
import ModelForm from "../../components/forms/ModelForm";
import axios from "axios";
import toast from "react-hot-toast";
import { Modal } from "antd";

export default function AdminModel() {
  //context
  const [auth] = useAuth();

  // state
  const [name, setName] = useState("");
  const [models, setModels] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatingName, setUpdatingName] = useState("");

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    try {
      const { data } = await axios.get("/models");
      setModels(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/model", { name });
      if (data?.error) {
        toast.error(data.error);
      } else {
        setName("");
        loadModels();
        toast.success(`"${data.name}" created successfully`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Model creation failed. Try again.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/model/${selected._id}`, {
        name: updatingName,
      });
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.name} is updated`);
        setSelected(null);
        setUpdatingName("");
        loadModels();
        setVisible(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Model may already exist. Try again.");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.delete(`/model/${selected._id}`);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.name} is deleted`);
        setSelected(null);
        loadModels();
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
              <h4>Manage Models</h4>
            </div>
            <ModelForm
              value={name}
              setValue={setName}
              handleSubmit={handleSubmit}
            />
            <hr></hr>
            <div className="d-flex">
              {models?.map((c) => (
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
              <ModelForm
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
