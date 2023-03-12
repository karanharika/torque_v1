import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PartCard from "../components/cards/PartCard";

export default function CategoryView() {
  // state
  const [parts, setParts] = useState([]);
  const [category, setCategory] = useState([]);

  // hooks
  const params = useParams();
  console.log("params => ", params);

  useEffect(() => {
    if (params?.slug) laodPartsByCategory();
    // eslint-disable-next-line
  }, [params?.slug]);

  const laodPartsByCategory = async () => {
    try {
      const { data } = await axios.get(`parts-by-category/${params.slug}`);
      setCategory(data.category);
      setParts(data.parts);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Jumbotron
        title={category?.name}
        subTitle={`${parts?.length} part/s found in ${category?.name}`}
      />

      <div className="constainer-fluid">
        <div className="row mt-3">
          {parts?.map((p) => (
            <div key={p._id} className="col-md-4">
              <PartCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
