import Jumbotron from "../../components/cards/Jumbotron";
import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/nav/AdminMenu";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

export default function AdminPart() {
  // context
  const [auth] = useAuth();
  // state
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [truckYear, setTruckYear] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [price, setPrice] = useState("");
  // hook
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadMakes();
  }, []);

  useEffect(() => {
    loadModels();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadMakes = async () => {
    try {
      const { data } = await axios.get("/makes");
      setMakes(data);
    } catch (err) {
      console.log(err);
    }
  };

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
      const partData = new FormData();
      partData.append("photo", photo);
      partData.append("name", name);
      partData.append("description", description);
      partData.append("category", category);
      partData.append("make", make);
      partData.append("model", model);
      partData.append("price", price);
      partData.append("quantity", quantity);
      partData.append("truckYear", truckYear);
      partData.append("partNumber", partNumber);

      const { data } = await axios.post("/part", partData);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`"${data.name}" is successfully created.`);
        navigate("/dashboard/admin/parts");
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
              <h4>Add your Part to the system</h4>
            </div>
            <form onSubmit={handleSubmit}>
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="part"
                    className="img img-responsive"
                    height="200px"
                  />
                </div>
              )}

              <div className="p-2">
                <label className="btn btn-outline-secondary p-2 col-12 mb-3">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              <input
                type="text"
                className="form-control p-2 mb-3"
                placeholder="Name of the part"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <textarea
                type="text"
                className="form-control p-2 mb-3"
                placeholder="Write Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="number"
                className="form-control p-2 mb-3"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

              <input
                type="number"
                className="form-control p-2 mb-3"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />

              <input
                type="number"
                className="form-control p-2 mb-3"
                placeholder="Enter the build year"
                value={truckYear}
                onChange={(e) => setTruckYear(e.target.value)}
              />

              <input
                type="text"
                className="form-control p-2 mb-3"
                placeholder="Enter part Number or OEM"
                value={partNumber}
                onChange={(e) => setPartNumber(e.target.value)}
              />

              <Select
                bordered={false}
                size="large"
                className="form-select mb-3"
                placeholder="Choose category"
                onChange={(value) => setCategory(value)}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <Select
                bordered={false}
                size="large"
                className="form-select mb-3"
                placeholder="Choose make"
                onChange={(value) => setMake(value)}
              >
                {makes?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <Select
                bordered={false}
                size="large"
                className="form-select mb-3"
                placeholder="Choose model"
                onChange={(value) => setModel(value)}
              >
                {models?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <button className="btn btn-primary mb-5">Add Part</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
