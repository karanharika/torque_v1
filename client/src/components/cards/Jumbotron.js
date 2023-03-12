export default function Jumbotron(props) {
  return (
    <div className="container-fluid text-warning">
      <div className="row">
        <div className="col text-center p-4">
          <h1 className="fw-bold">{props.title}</h1>
          <p className="lead">{props.subTitle}</p>
        </div>
      </div>
    </div>
  );
}
