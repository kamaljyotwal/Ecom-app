import React from "react";
import { Link } from "react-router-dom";
export default function ProductCard({ eachproduct }) {
  return (
    <>
      <div className="card p-3 rounded">
        <img className="card-img-top mx-auto" src={eachproduct.images[0].url} alt="product" />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/products/${eachproduct._id}`}>{eachproduct.name}</Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(eachproduct.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="">{eachproduct.numOfReviews} Reviews</span>
          </div>
          <p className="card-text">${eachproduct.price}</p>

          <Link to={`/products/${eachproduct._id}`} id="view_btn" className="btn btn-block">
            View Details
          </Link>
        </div>
      </div>
    </>
  );
}
