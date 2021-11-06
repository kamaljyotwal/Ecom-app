import React, { useState, useEffect } from "react";
import CustomTitle from "../layouts/CustomTitle";
import CheckoutSteps from "./CheckoutSteps";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createOrderAction, clearErrors } from "../../actions/orderAction";
import axios from "axios";

import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

function Payment() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  // global state
  const { user } = useSelector((state) => state.user);
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const newOrder = useSelector((state) => state.newOrder);

  // local state
  const [clicked, setClicked] = useState(false);

  const options = {
    style: { base: { fontSize: "16px" }, invalid: { color: "#9e2146" } },
  };

  // taking data from session storage
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  // object of placed order to be sent to db
  const orderData = {
    orderedItems: cartItems,
    shippingInfo,
  };

  if (orderInfo) {
    orderData.itemsPrice = Number(orderInfo.itemsPrice);
    orderData.shippingPrice = Number(orderInfo.shippingPrice);
    orderData.taxPrice = Number(orderInfo.taxPrice);
    orderData.totalPrice = Number(orderInfo.totalPrice);
  }

  // handler
  async function submitHandler(e) {
    e.preventDefault();
    setClicked(true);
    document.querySelector("#pay_btn").disabled = true;
    document.querySelector("#pay_btn").disabled = true;

    let res;

    try {
      const config = { headers: { "Content-Type": "application/json" } };
      res = await axios.post("/api/v1/payment/process", paymentData, config);
      const clientSecret = res.data.client_secret;

      if (!stripe || !elements) {
        console.log("no stripe or elements");
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        // console.log(result.error);
        alert.error(result.error.message);
        setClicked(false);
        document.querySelector("#pay_btn").disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          orderData.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrderAction(orderData));
          history.push("/success");
        }
      }
    } catch (error) {
      console.log(error);
      setClicked(false);
      document.querySelector("#pay_btn").disabled = false;
      alert.error("There is some issue while payment processing");
    }
  }

  useEffect(() => {
    if (newOrder.error) {
      alert.error(newOrder.error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, newOrder.error]);

  return (
    <>
      <CustomTitle title="Payment" />
      <CheckoutSteps shipping confirmOrder payment />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                options={options}
              />
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              {!clicked && `Pay - ${orderInfo.totalPrice}`}

              {clicked && "Processing..."}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Payment;
