import React, { Fragment, useEffect } from "react";
import CustomTitle from "../layouts/CustomTitle";
import CheckoutSteps from "./CheckoutSteps";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";

// import {
//   useStripe,
//   useElements,
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
// } from "@stripe/react-stripe-js";

function Payment() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Fragment>
      <CustomTitle title="Payment" />

      <CheckoutSteps shipping confirmOrder payment />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg">
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              {/* <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                // options={options}
              /> */}
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              {/* <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                // options={options}
              /> */}
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              {/* <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                // options={options}
              /> */}
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Pay
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default Payment;
