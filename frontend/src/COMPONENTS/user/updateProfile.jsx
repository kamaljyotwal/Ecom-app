import React, { useState, useEffect } from "react";
import CustomTitle from "../layouts/CustomTitle";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileAction, loadCurrentUserAction, clearErrors } from "../../actions/authAction";
import * as AC from "../../constants/authConstants";

export default function UpdateProfile() {
  let history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.jpg");

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.user2);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (user && processing == false) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("User updated successfully");
      dispatch(loadCurrentUserAction());
      history.push("/me");

      dispatch({ type: AC.UPDATE_PROFILE_RESET });
    }
  }, [user, error, alert, dispatch, loading, history, isUpdated]);

  const submitFunc = (e) => {
    e.preventDefault();
    setProcessing(true);
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("avatar", avatar);
    dispatch(updateProfileAction(formData));
  };
  const onChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <CustomTitle title="Update Profile" />
      <div className="container-container-fluid">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitFunc} encType="multipart/form-data">
              <h1 className="mt-2 mb-5">Update Profile</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="name"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="avatar_upload">Avatar</label>
                <div className="d-flex align-items-center">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <img src={avatarPreview} className="rounded-circle" alt="Avatar Preview" />
                    </figure>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="avatar"
                      className="custom-file-input"
                      id="customFile"
                      accept="image/*"
                      onChange={onChange}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Avatar
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading ? true : false}
                className="btn update-btn btn-block mt-4 mb-3"
              >
                {loading == true ? "processing" : "Update"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
