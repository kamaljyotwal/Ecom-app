import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductDetailsAction, clearErrors } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { useAlert } from "react-alert";
import { Carousel } from "react-bootstrap";
import CustomTitle from "../COMPONENTS/layouts/CustomTitle";
import { addItemToCartAction } from "../actions/cartActions";
import ListReviews from "./review/ListReviews";
import ReviewModal from "./review/ReviewModal";

export default function ProductDetails() {
  const { productId } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();

  // global state
  const { product, error, loading } = useSelector((state) => state.productDetails);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { success } = useSelector((state) => state.newReview);

  // local state
  const [quantity, setQuantity] = useState(1);
  const [reviewModalToggle, setReviewModalToggle] = useState(false);
  const [rating, setRating] = useState(0);

  // side Effects
  useEffect(() => {
    dispatch(getProductDetailsAction(productId));

    if (success) {
      alert.success("Review added");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [success, alert, error, productId, dispatch]);

  // handlers
  function addToCart() {
    // console.log(`${productId} - ${quantity}`);
    dispatch(addItemToCartAction(productId, quantity));
    alert.success("Product added to cart");
  }
  function increaseQty() {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  }
  function decreaseQty() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  function setUserRatings(e) {
    let stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("orange");

            setRating(this.starValue);
          } else {
            star.classList.remove("orange");
          }
        }

        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("yellow");
          } else {
            star.classList.remove("yellow");
          }
        }

        if (e.type === "mouseout") {
          star.classList.remove("yellow");
        }
      });
    }
  }

  return (
    <>
      {error ? (
        <h1>Error</h1>
      ) : loading === true ? (
        <Loader />
      ) : (
        <>
          {/* {console.log(product.images)} */}
          <CustomTitle title={product.name} />
          <div className="container container-fluid">
            <div className="product-mainDiv">
              <div id="product_image" className="left-part">
                <Carousel pause="hover">
                  {product.images !== undefined &&
                    product.images.map((i) => (
                      <Carousel.Item key={i.public_id}>
                        <img
                          src={i.url}
                          alt={product.title}
                          className="d-block w-100"
                          width="auto"
                          height="auto"
                        />
                      </Carousel.Item>
                    ))}
                </Carousel>
              </div>
              <div className="right-part">
                <h3>{product.name}</h3>
                <p id="product_id">Product #{product._id}</p>
                <hr />

                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: `${(product.ratings / 5) * 100}%` }}
                  ></div>
                </div>
                <span id="no_of_reviews">{product.numOfReviews} Reviews</span>

                <hr />

                <p id="product_price">${product.price}</p>
                <div className="stockCounter d-inline">
                  <span className="btn btn-danger minus" onClick={decreaseQty}>
                    -
                  </span>
                  <input
                    type="number"
                    className="form-control count d-inline"
                    value={quantity}
                    readOnly
                  />
                  <span type="button" className="btn btn-primary plus" onClick={increaseQty}>
                    +
                  </span>
                </div>

                <button
                  type="button"
                  id="cart_btn"
                  className="btn btn-primary d-inline ml-4"
                  disabled={product.stock === 0 ? true : false}
                  onClick={addToCart}
                >
                  Add to Cart
                </button>

                <hr />

                <p>
                  Status:
                  <span id="stock_status" styles={{ color: "red" }}>
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </p>

                <hr />

                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr />
                <p id="product_seller mb-3">
                  Sold by: <strong>Amazon</strong>
                </p>

                {isAuthenticated ? (
                  <button
                    id="review_btn"
                    type="button"
                    className="btn btn-primary mt-4"
                    data-toggle="modal"
                    data-target="#ratingModal"
                    // eslint-disable-next-line
                    onClick={(e) => (setUserRatings(e), setReviewModalToggle(true))}
                  >
                    Submit Your Review
                  </button>
                ) : (
                  <div className="alert alert-danger mt-5" type="alert">
                    Login to post your review.
                  </div>
                )}
              </div>
            </div>
            <ReviewModal
              setReviewModalToggle={setReviewModalToggle}
              reviewModalToggle={reviewModalToggle}
              productId={productId}
              rating={rating}
              setRating={setRating}
            />
          </div>
          {product.reviews && product.reviews.length > 0 && (
            <ListReviews reviews={product.reviews} />
          )}
        </>
      )}
    </>
  );
}
