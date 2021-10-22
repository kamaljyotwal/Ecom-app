import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Search from "../layouts/Search";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { logoutAction } from "../../actions/authAction";

export default function Header() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [toggleOn, setToggleOn] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  function logoutFunc() {
    dispatch(logoutAction());
    alert.success("Logged out successfully.");
    setToggleOn(false);
  }

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

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center ">
          <NavLink to="/cart" style={{ textDecoration: "none" }}>
            <span id="cart" className="ml-3">
              Cart
            </span>
            <span className="ml-1 mr-3" id="cart_count">
              2
            </span>
          </NavLink>

          {user && (
            <>
              <div
                // to="#!"
                className="btn text-white profileContainer"
                data-toggle="collapse"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={() => setToggleOn((toggleOn) => !toggleOn)}
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </div>

              {toggleOn && (
                <div className="toggleContainer">
                  {user && user.role === "admin" && (
                    <Link
                      to="/dashboard"
                      className="toggleChild"
                      onClick={() => setToggleOn(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link to="/orders/me" className="toggleChild" onClick={() => setToggleOn(false)}>
                    My Orders
                  </Link>
                  <Link to="/me" className="toggleChild" onClick={() => setToggleOn(false)}>
                    Profile
                  </Link>
                  <Link className="text-danger toggleChild" to="/" onClick={logoutFunc}>
                    Logout
                  </Link>
                </div>
              )}
            </>
          )}
          {isAuthenticated === false ? (
            <NavLink className="btn" id="login_btn" to="/login">
              Login
            </NavLink>
          ) : null}
        </div>
      </nav>
    </>
  );
}
// C:\Users\kamal jyotwal\Desktop\Ecom-app\frontend\public\images\logo.png
// frontend\public\images\logo.png
