import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import LoadingGIF from "../../images/Loading.gif";

export default function Loading() {
  //state
  const [count, setCount] = useState(3);
  //hooks
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    //redirect once count is 0
    count === 0 &&
      navigate("/login", {
        state: location.pathname,
      });
    //cleanup
    return () => clearInterval(interval);
  }, [count, navigate, location.pathname]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {/* <img src={LoadingGIF} alt="Loading..." style={{ width: "100px" }} /> */}
    </div>
  );
}
