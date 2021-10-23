import React, { useState, useEffect } from "react";
import CustomTitle from "../layouts/CustomTitle";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePasswordAction, clearErrors } from "../../actions/authAction";
import * as AC from "../../constants/authConstants";

export default function PasswordUpdate() {
  let history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, isUpdated } = useSelector((state) => state.user2);

  // local state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // handlers
  const submitFunc = (e) => {
    e.preventDefault();
    const body = { oldPassword, newPassword, confirmPassword };

    dispatch(updatePasswordAction(body));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password updated successfully");
      history.push("/me");
      dispatch({
        type: AC.UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, alert, error, history, isUpdated]);

  return (
    <>
      <CustomTitle title="Update Password" />
      <div className="container-container-fluid">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitFunc}>
              <h1 className="mb-3">New Password</h1>
              <div className="form-group">
                <label htmlFor="password_field">Current Password</label>
                <input
                  type="password"
                  id="current_password_field"
                  className="form-control"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password_field">New Password</label>
                <input
                  type="text"
                  id="password_field"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirm_password_field">Confirm New Password</label>
                <input
                  type="text"
                  id="confirm_password_field"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <button
                id="new_password_button"
                type="submit"
                className="btn btn-block py-3"
                disabled={newPassword === confirmPassword ? false : true}
              >
                {newPassword !== confirmPassword ? "Password should be same" : "Set Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
