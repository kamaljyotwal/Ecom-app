import { useEffect, useState } from "react";
import CustomTitle from "../layouts/CustomTitle";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerAction, clearErrors } from "../../actions/authAction";

// url => /register
export default function Signup() {
  const dispatch = useDispatch();
  let history = useHistory();
  const alert = useAlert();

  // local state
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.jpg");
  const { loading, isAuthenticated, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, history, isAuthenticated, error, alert]);

  // form handlers
  const submitFunc = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", user.name);
    formData.set("email", user.email);
    formData.set("password", user.password);
    formData.set("avatar", avatar);

    dispatch(registerAction(formData));
  };
  function onChange(e) {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  }

  return (
    <>
      <CustomTitle title="Signup" />
      <div className="container container-fluid">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" encType="multipart/form-data" onSubmit={submitFunc}>
              <h1 className="mb-3">Register</h1>

              <div className="form-group">
                <label htmlFor="email_field">Name</label>
                <input
                  type="name"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={user.name}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  name="email"
                  value={user.email}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  name="password"
                  value={user.password}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="avatar_upload">Avatar</label>
                <div className="d-flex align-items-center">
                  <div>
                    <figure className="avatar mr-3 item-rtl">
                      <img src={avatarPreview} className="rounded-circle" alt="" />
                    </figure>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      name="avatar"
                      className="custom-file-input"
                      id="customFile"
                      onChange={onChange}
                      accept="images/*"
                    />

                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Avatar
                    </label>
                  </div>
                </div>
              </div>

              <button
                disabled={loading ? true : false}
                id="register_button"
                type="submit"
                className="btn btn-block py-3"
              >
                REGISTER
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
