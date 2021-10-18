import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginAction, clearErrors } from "../../actions/authAction";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from "../Loader";
import CustomTitle from "../layouts/CustomTitle";

export default function Login() {
  let history = useHistory();
  const alert = useAlert();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { isAuthenticated, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, loading, isAuthenticated, alert, dispatch, history]);

  function submitFunc(e) {
    e.preventDefault();
    dispatch(loginAction(email, password));
  }
  return loading ? (
    <Loader />
  ) : (
    <>
      <CustomTitle title="Login" />

      <div className="container container-fluid">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitFunc}>
              <h1 className="mb-3">Login</h1>
              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Link to={"/password/forgot"} className="float-right mb-4">
                Forgot Password?
              </Link>

              <button id="login_button" type="submit" className="btn btn-block py-3">
                LOGIN
              </button>

              <Link to={"/register"} className="float-right mt-3">
                New User?
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}