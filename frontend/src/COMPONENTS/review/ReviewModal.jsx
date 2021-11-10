import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { newReviewAction } from "../../actions/productActions";

export default function ReviewModal({
  reviewModalToggle,
  setReviewModalToggle,
  productId,
  rating,
}) {
  const dispatch = useDispatch();

  // local state
  const [comment, setComment] = useState("");

  //sending data on modal submit click
  const reviewHandler = () => {
    const formData = {};
    formData.rating = rating;
    formData.comment = comment;
    formData.productId = productId;
    dispatch(newReviewAction(formData, productId));

    setTimeout(() => {
      setReviewModalToggle(false);
    }, 400);
  };

  return ReactDOM.createPortal(
    <>
      <div className="overlay" style={{ display: reviewModalToggle ? "block" : "none" }}>
        <div className="rating">
          <div
            //   className="modal fade"
            id="ratingModal"
            // tabIndex="-1"
            // role="dialog"
            // aria-labelledby="ratingModalLabel"
            // aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="ratingModalLabel">
                    Submit Review
                  </h5>
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={(e) => setReviewModalToggle(false)}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <ul className="stars">
                    <li className="star">
                      <i className="fa fa-star"></i>
                    </li>
                    <li className="star">
                      <i className="fa fa-star"></i>
                    </li>
                    <li className="star">
                      <i className="fa fa-star"></i>
                    </li>
                    <li className="star">
                      <i className="fa fa-star"></i>
                    </li>
                    <li className="star">
                      <i className="fa fa-star"></i>
                    </li>
                  </ul>

                  <textarea
                    name="review"
                    id="review"
                    className="form-control mt-3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>

                  <button
                    className="btn my-3 float-right review-btn px-4 text-white"
                    onClick={reviewHandler}
                    // data-dismiss="modal"
                    aria-label="Close"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portalDiv")
  );
}
