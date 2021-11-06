import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfoAction } from "../../actions/cartActions";
import CustomTitle from "../layouts/CustomTitle";
import { countries } from "countries-list";
import { useHistory } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";

export default function Shipping() {
  const dispatch = useDispatch();
  const history = useHistory();

  // global state
  const { shippingInfo } = useSelector((state) => state.cart);
  // destructuring
  const countriesList = Object.values(countries);

  // local state
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [country, setCountry] = useState(shippingInfo.country);

  //   handlers
  function submitHandler(e) {
    e.preventDefault();
    dispatch(saveShippingInfoAction({ address, city, postalCode, phoneNo, country }));
    history.push("/confirm");
  }

  return (
    <>
      <CustomTitle title="Shipping Page" />
      <CheckoutSteps shipping />
      <div className="row wrapper shippingContainer">
        <div className="col-10 col-lg-5">
          <form onSubmit={submitHandler} className="shadow-lg">
            <h1 className="mb-4">Shipping Info</h1>
            <div className="form-group">
              <label htmlFor="address_field">Address</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city_field">City</label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_field">Phone No</label>
              <input
                type="number"
                id="phone_field"
                className="form-control"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="postal_code_field">Postal Code</label>
              <input
                type="number"
                id="postal_code_field"
                className="form-control"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="country_field">Country</label>
              <select
                id="country_field"
                className="form-control"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                {countriesList.map((i) => (
                  <option key={i.name} value={i.name}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>

            <button id="shipping_btn" type="submit" className="btn btn-block py-3">
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
