import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { orderDetailsAction, clearErrors } from "../../actions/orderAction";
import Loader from "../Loader";
import CustomTitle from "../layouts/CustomTitle";

export default function OrderDetails() {
  const { orderId } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();

  // global state
  const { error, order } = useSelector((state) => state.orderDetails);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(orderDetailsAction(orderId));
  }, [dispatch, orderId]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [alert, error, dispatch]);

  // let shippingDetails =
  //   order.data.shippingInfo &&
  //   `${order.data.shippingInfo.address}, ${order.data.shippingInfo.city}, ${order.data.shippingInfo.postalCode}, ${order.data.shippingInfo.country}`;

  // var isPaid = order && order.data.paymentInfo.status === "succeeded" ? true : false;

  return (
    <>
      {order == null ? (
        <Loader />
      ) : (
        <>
          <CustomTitle title="order page" />
          <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h1 className="my-5">Order # {orderId}</h1>

              <h4 className="mb-4">Shipping Info</h4>
              <p>
                <b>Name: {user && user.name}</b> {}
              </p>
              <p>
                <b>Phone:</b> {order.data && order.data.shippingInfo.phoneNo}
              </p>
              <p className="mb-4">
                <b>Address: </b>
                {order.data &&
                  `${order.data.shippingInfo.address}, ${order.data.shippingInfo.city},
                 ${order.data.shippingInfo.postalCode}, ${order.data.shippingInfo.country}`}
              </p>
              <p>
                <b>Amount: </b>
                {order.data && `${order.data.totalPrice}`}
              </p>
              <hr />

              <h4 className="my-4">Payment</h4>
              <p
                className={order.data && order.data.paymentInfo.status ? "greenColor" : "redColor"}
              >
                <b>
                  {order.data && order.data.paymentInfo.status === "succeeded"
                    ? "PAID"
                    : "NOT PAID"}
                </b>
              </p>

              <h4 className="my-4">Order Status:</h4>
              <p
                className={
                  order.data && String(order.data.orderStatus).includes("Delivered")
                    ? "greenColor"
                    : "redColor"
                }
              >
                <b>{order.data && order.data.orderStatus}</b>
              </p>

              <h4 className="my-4">Order Items:</h4>

              <hr />
              <div className="cart-item my-1">
                {/* {console.log(order.data.order)} */}
                {order.data &&
                  order.data.orderedItems.map((item) => (
                    <div key={item.productId} className="row my-5">
                      <div className="col-4 col-lg-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          height="60px"
                          width="100%"
                          style={{
                            objectFit: "contain",
                            paddingRight: "1rem",
                            // boxShadow: "0px 0px 1px 1px #eee",
                          }}
                        />
                      </div>

                      <div className="col-5 col-lg-5">
                        <Link to={`/products/${item.productId}`}>{item.name}</Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>${item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>{item.quantity} Piece(s)</p>
                      </div>
                    </div>
                  ))}
              </div>
              <hr />
            </div>
          </div>
        </>
      )}
    </>
  );
}
