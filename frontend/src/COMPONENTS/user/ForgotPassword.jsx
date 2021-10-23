import React, { useState, useEffect } from "react";
import CustomTitle from "../layouts/CustomTitle";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordAction, clearErrors } from "../../actions/authAction";

export default function ForgotPassword() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const { loading, error, message } = useSelector((state) => state.forgotPassword);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, alert, error, message]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordAction({ email }));
  };

  return (
    <>
      <CustomTitle title="Forgot Password" />
      <div className="container-container-fluid">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
              <h1 className="mb-3">Forgot Password</h1>
              <div className="form-group">
                <label htmlFor="email_field">Enter Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                id="forgot_password_button"
                disabled={loading ? true : false}
                type="submit"
                className="btn btn-block py-3"
              >
                Send Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
