import { useSearch } from "../context/search";
import PartCard from "../components/cards/PartCard";
import Jumbotron from "../components/cards/Jumbotron";

export default function Search() {
  const [values] = useSearch();

  return (
    <>
      <Jumbotron
        title="Search Results"
        subTitle={
          values?.results?.length < 1
            ? "No parts available"
            : `Found ${values?.results?.length} parts`
        }
      />
      <div className="container mt-3">
        <div className="row">
          {values?.results?.map((p) => (
            <div key={p._id} className="col-md-4">
              <PartCard p={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
