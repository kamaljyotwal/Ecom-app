import React from "react";

export default function ListReviews({ reviews }) {
  return (
    <>
      <div className="reviews w-75">
        <h3>All Reviews:</h3>
        <hr />
        {reviews &&
          reviews.map((review) => (
            <div key={review._id} className="review-card my-3">
              <p className="review_comment">{review.comment}</p>
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(review.rating / 5) * 100}%` }}
                ></div>
              </div>
              <p className="review_user">by {review.name}</p>
              <hr />
            </div>
          ))}
      </div>
    </>
  );
}
