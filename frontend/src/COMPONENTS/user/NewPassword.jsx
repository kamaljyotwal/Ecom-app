import React, { useState, useEffect } from "react";
import CustomTitle from "../layouts/CustomTitle";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { setNewPasswordAction, clearErrors } from "../../actions/authAction";

export default function NewPassword() {
  const history = useHistory();
  const { hashedTkn } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();

  //   global state
  const { loading, error, success } = useSelector((state) => state.forgotPassword);

  //   local state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Password updated successfully");
      history.push("/login");
    }
  }, [alert, error, history, success, dispatch]);

  // handlers
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setNewPasswordAction({ password, confirmPassword, hashedTkn }));
  };

  return (
    <>
      <CustomTitle title="Set New Password" />
      <div className="container-container-fluid">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
              <h1 className="mb-3">Set New Password</h1>

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

              <div className="form-group">
                <label htmlFor="confirm_password_field">Confirm Password</label>
                <input
                  type="password"
                  id="confirm_password_field"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                disabled={loading ? true : false}
                id="new_password_button"
                type="submit"
                className="btn btn-block py-3"
              >
                Set Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
