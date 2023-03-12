import Button from "react-bootstrap/esm/Button";
import Search from "../components/forms/Search";
//import Update1 from "../images/updates/2019-08-02.jpg";
//import Update2 from "../images/updates/2019-06-12.jpg";

export default function Home() {
  return (
    <div className="Home bg-dark">
      <div className="container-fluid text-warning mb-150 mt-150">
        <div className="row">
          <div className="col text-center p-4">
            <p className="lead mb-1">Truck Repair Shop in Delta</p>
            <p className="lead mb-5">Opening at 09:00 tomorrow</p>
            <Button variant="outline-warning" size="lg">
              GET A QUOTE
            </Button>
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
}
