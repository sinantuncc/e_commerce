import { useEffect, useState } from "react";
import router from "next/router";
import Image from "next/image";
import Head from "next/head";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { getData, patchData } from "../../utils/fetchData";
import OrderDetail from "../../components/OrderDetail";
import { AiFillCamera } from "react-icons/ai";
import { validateFullname, validateUsername } from "../../utils/validForm";
import { notifyError, notifySuccess } from "../../store/actions/notify";
import { load } from "../../store/actions/loading";

const initialValue = {
  fullName: "",
  password: "",
  cf_password: "",
  avatar: "",
  username: "",
  currentPass: "",
};

const UserDetail = () => {
  const { auth, loading } = useSelector((state) => state);
  const { isLogged, user, token } = auth;

  const dispatch = useDispatch();

  const [passwordPanel, setPasswordPanel] = useState(false);
  const [form, setForm] = useState(initialValue);
  const [orders, setOrders] = useState([]);

  const { password, cf_password, fullName, username, currentPass } = form;

  const [localAuth] = useLocalStorage("_auth_");

  useEffect(() => {
    if (!localAuth?.isLogged) router.push("/");
  }, [isLogged]);

  useEffect(() => {
    if (user)
      setForm({
        ...form,
        username: user.username,
        fullName: user.fullName || "",
      });
  }, [user]);

  useEffect(() => {
    const getOrders = async () => {
      const res = await getData("order", token);
      if (res.success) setOrders(res.data);
    };
    getOrders();
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (fullName) {
      if (!validateFullname(fullName))
        return dispatch(notifyError("Invalid full name"));
    }

    if (username) {
      if (!validateUsername(username))
        return dispatch(
          notifyError(
            "Username must start with a letter and can only contain letters, numbers and underscore."
          )
        );
    }

    if (password) {
      if (password.length < 6)
        return dispatch(notifyError("Password must be at least 6 characters"));
      if (password !== cf_password)
        return dispatch(notifyError("Confirm password don't match"));
      if (currentPass.length < 6)
        return dispatch(
          notifyError("Current password must be at least 6 characters")
        );
      resetPassword();
    }
  };

  const resetPassword = async () => {
    dispatch(load(true));

    const res = await patchData(
      "user/resetPassword",
      { password, currentPass },
      token
    );

    if (res.success) {
      dispatch(notifySuccess(res.message));
      setForm(initialValue);
      setPasswordPanel(false);
    } else {
      dispatch(notifyError(res.message));
    }
    dispatch(load(false));
  };

  return (
    <div className="container mt-4">
      <Head>
        <title>Profile</title>
      </Head>
      {user ? (
        <div className="row">
          <div className="col-md-5 mx-auto text-center profile_page">
            <h2 className="mb-3">Welcome {user.username}</h2>
            <div className="avatar">
              <Image
                src={user.avatar}
                alt={user.avatar}
                height="300"
                width="300"
                className="rounded-circle"
              />
              <span>
                <AiFillCamera size="1.5em" className="mt-3" />
                <p>Change</p>
                <input
                  type="file"
                  name="avatar"
                  onChange={handleChange}
                  id="file_up"
                />
              </span>
            </div>
            <form method="POST" onSubmit={handleSubmit}>
              <div className="form-group text-left mt-3">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={fullName}
                  placeholder={user.fullName || "Add a Full Name"}
                  name="fullName"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group text-left mt-3">
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  name="username"
                  onChange={handleChange}
                />
              </div>

              <div className="form-group text-left">
                <label>Email</label>
                <input
                  className="form-control"
                  defaultValue={user.email}
                  disabled
                />
              </div>

              {passwordPanel && (
                <>
                  <div className="form-group text-left">
                    <label>New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={password}
                      name="password"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group text-left">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={cf_password}
                      name="cf_password"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group text-left">
                    <label>Current Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={currentPass}
                      name="currentPass"
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}

              <div className="d-flex justify-content-end">
                {passwordPanel ? (
                  <button
                    className="btn btn-secondary mr-1"
                    onClick={() => setPasswordPanel(false)}
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    className="btn btn-primary mr-1"
                    onClick={() => setPasswordPanel(true)}
                  >
                    Change Password
                  </button>
                )}
                <button
                  type="submit"
                  className="btn btn-success ml-1"
                  onSubmit={handleSubmit}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm mx-2 text-white"
                        role="status"
                        aria-hidden="true"
                      />
                      Updating...
                    </>
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="col-md-7">
            <h2>Orders</h2>
            <div>
              {orders.length ? (
                <div>
                  {orders.map((order) => (
                    <OrderDetail key={order._id} order={order}></OrderDetail>
                  ))}
                </div>
              ) : (
                <h6 className="text-center m-5">No Order</h6>
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserDetail;
