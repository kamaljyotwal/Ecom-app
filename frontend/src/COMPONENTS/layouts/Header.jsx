import React from "react";
import { NavLink } from "react-router-dom";
import Search from "../layouts/Search";

export default function Header() {
  return (
    <>
      <nav className="navbar row">
        <div className="col-12 col-md-3 child1">
          <NavLink to="/">
            <div className="navbar-brand">
              <img src={"/images/logo.png"} alt="Logo" />
            </div>
          </NavLink>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          {/* <Route render={({ history }) => <Search history={history} />} /> */}
          <Search />
        </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <button className="btn" id="login_btn">
            Login
          </button>

          <span id="cart" className="ml-3">
            Cart
          </span>
          <span className="ml-1" id="cart_count">
            2
          </span>
        </div>
      </nav>
    </>
  );
}
// C:\Users\kamal jyotwal\Desktop\Ecom-app\frontend\public\images\logo.png
// frontend\public\images\logo.png
