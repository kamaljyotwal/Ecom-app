import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import CustomTitle from "../layouts/CustomTitle";
import { removeItemFromCartAction, addItemToCartAction } from "../../actions/cartActions";

export default function Cart() {
  const dispatch = useDispatch();
  const history = useHistory();

  // global state
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.user);
  // console.log(cartItems);


  // handlers
  function removeItemHandler(productId) {
    dispatch(removeItemFromCartAction(productId));
  }
  function increaseQty(productId, quantity, stock) {
    if (quantity < stock) {
      dispatch(addItemToCartAction(productId, quantity + 1));
    }
  }
  function decreaseQty(productId, quantity) {
    if (quantity > 1) {
      dispatch(addItemToCartAction(productId, quantity - 1));
    }
  }
  function checkoutHandler() {
    if (isAuthenticated) {
      history.push("/shipping");
    } else {
      history.push("/login?redirect=shipping");
    }
  }

  return (
    <>
      <CustomTitle title="Your Cart" />
      <div className="container container-fluid">
        <h2 className="mt-5">
          {cartItems.length == 0 ? "Your Cart is Empty" : `Your Cart: ${cartItems.length} items`}
        </h2>

        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
            <hr />
            <div className="cart-item">
              {cartItems.map((i) => (
                <div className="row roweach" key={i.productId}>
                  <div className="col-4 col-lg-3">
                    <img
                      src={i.image}
                      alt="Laptop"
                      height="100"
                      width="140px"
                      style={{ objectFit: "contain" }}
                    />
                  </div>

                  <div className="col-5 col-lg-3">
                    <Link to={`/product/${i.productId}`}>{i.name}</Link>
                  </div>

                  <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                    <p id="card_item_price">${i.price}</p>
                  </div>

                  <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                    <div className="stockCounter d-inline">
                      <span
                        onClick={() => decreaseQty(i.productId, i.quantity)}
                        className="btn btn-danger minus"
                      >
                        -
                      </span>
                      <input
                        type="number"
                        className="form-control count d-inline"
                        value={i.quantity}
                        readOnly
                      />
                      <span
                        onClick={() => increaseQty(i.productId, i.quantity, i.stock)}
                        className="btn btn-primary plus"
                      >
                        +
                      </span>
                    </div>
                  </div>

                  <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                    <i
                      onClick={(e) => removeItemHandler(i.productId)}
                      id="delete_cart_item"
                      className="fa fa-trash btn btn-danger"
                    ></i>
                  </div>
                </div>
              ))}
            </div>
            {/* {cartItems.length > 0 && <hr />} */}
          </div>

          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>
                Subtotal:{" "}
                <span className="order-summary-values">
                  {cartItems.reduce((acc, item) => acc + Number(item.quantity), 0)} (Units)
                </span>
                {/* {cartItems.reduce((acc, item) => acc + Number(item.quantity), 0)} */}
              </p>
              <p>
                Est. total:{" "}
                <span className="order-summary-values">
                  ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}
                </span>
              </p>

              <hr />
              <button
                disabled={cartItems.length == 0 ? true : false}
                onClick={checkoutHandler}
                id="checkout_btn"
                className="btn btn-primary btn-block"
              >
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
