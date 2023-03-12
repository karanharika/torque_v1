import Jumbotron from "../components/cards/Jumbotron";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

export default function CategoriesList() {
  const categories = useCategory();

  return (
    <>
      <Jumbotron title="Categories" subTitle="View Parts based on Categories" />

      <div className="container overflow-hidden">
        <div className="row gx-5 gy-5 mt-3 mb-5">
          {categories?.map((c) => (
            <div className="col-md-6" key={c._id}>
              <Link className="text-decoration-none" to={`/category/${c.slug}`}>
                <button className="btn btn-light col-12 text-dark p-3">
                  {c.name}
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
