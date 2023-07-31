import React, { useRef } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

export default function VanDetail() {
  const location = useLocation();
  const params = useParams();
  const [van, setVan] = React.useState(null);
  React.useEffect(() => {
    fetch(`/api/vans/${params.id}`)
      .then((res) => res.json())
      .then((data) => setVan(data.vans));
  }, [params.id]);

  const couterRef = useRef(0);
  console.log(couterRef);

  function capitalizeWord(str) {
    const newStr = str
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
    return newStr;
  }
  return (
    <div className="van-detail-container">
      <Link
        to={`..${location.state ? location.state?.search : ""}`}
        relative="path"
        className="back-button"
      >
        &larr;
        <span>
          Back to {`${location.state?.type ? location.state?.type : "all"}`}{" "}
          vans
        </span>
      </Link>

      {van ? (
        <div className="van-detail">
          <img src={van.imageUrl} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
