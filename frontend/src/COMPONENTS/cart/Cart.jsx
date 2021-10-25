import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CustomTitle from "../layouts/CustomTitle";
import { removeItemFromCartAction, addItemToCartAction } from "../../actions/cartActions";

export default function Cart() {
  const dispatch = useDispatch();

  // global state
  const { cartItems } = useSelector((state) => state.cart);
  // const { product } = useSelector((state) => state.productDetails);

  // handlers
  function removeItemHandler(productId) {
    dispatch(removeItemFromCartAction(productId));
  }
  function increaseQty(product, quantity, stock) {
    if (quantity < stock) {
      dispatch(addItemToCartAction(product, quantity + 1));
    }
  }
  function decreaseQty(product, quantity) {
    if (quantity > 1) {
      dispatch(addItemToCartAction(product, quantity - 1));
    }
  }

  return (
    <>
      <CustomTitle title="Your Cart" />
      <div className="container container-fluid">
        <h2 className="mt-5">
          {cartItems === [] ? "Your Cart is Empty" : `Your Cart: ${cartItems.length} items`}
        </h2>

        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
            <hr />
            <div className="cart-item">
              {cartItems.map((i) => (
                <>
                  <div className="row roweach" key={i.product}>
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
                      <Link to={`/product/${i.product}`}>{i.name}</Link>
                    </div>

                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price">${i.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                      <div className="stockCounter d-inline">
                        <span
                          onClick={() => decreaseQty(i.product, i.quantity)}
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
                          onClick={() => increaseQty(i.product, i.quantity, i.stock)}
                          className="btn btn-primary plus"
                        >
                          +
                        </span>
                      </div>
                    </div>

                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                      <i
                        onClick={(e) => removeItemHandler(i.product)}
                        id="delete_cart_item"
                        className="fa fa-trash btn btn-danger"
                      ></i>
                    </div>
                  </div>
                </>
              ))}
            </div>
            <hr />
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
              <button id="checkout_btn" className="btn btn-primary btn-block">
                Check out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
