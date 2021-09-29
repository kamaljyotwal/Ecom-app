import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ eachproduct, col }) {
  return (
    <div className={`col-6 col-md-3 col-lg-${col} my-3 right-div`} key={eachproduct._id}>
      <div className="card p-3 rounded">
        <img className="card-img-top mx-auto" src={eachproduct.images[0].url} alt="product" />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/product/${eachproduct._id}`}>{eachproduct.name}</Link>
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

          <Link to={`/product/${eachproduct._id}`} id="view_btn" className="btn btn-block">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
