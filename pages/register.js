import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import validForm from "../utils/validForm";
import { useDispatch, useSelector } from "react-redux";
import {
  notifyError,
  notifyReset,
  notifySuccess,
} from "../store/actions/notify";
import { load } from "../store/actions/loading";
import { postData } from "../utils/fetchData";

const initialState = {
  username: "",
  email: "",
  password: "",
  cf_password: "",
};

const Register = () => {
  const [userData, setUserData] = useState(initialState);
  const { username, email, password, cf_password } = userData;

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.loading);
  const { message, color } = useSelector((state) => state.notify);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch(notifyReset());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validForm(userData);

    if (errors) {
      dispatch(notifyError(errors));
    } else {
      register();
    }
  };

  const register = async () => {
    dispatch(load(true));
    const form = { username, email, password };
    const result = await postData("auth/register", form);
    if (result.success) {
      dispatch(notifySuccess(result.message));
    } else {
      dispatch(notifyError(result.message));
    }
    dispatch(load(false));
  };

  return (
    <>
      <Head>
        <title>E-SHOP | Register</title>
      </Head>
      <fieldset disabled={loading ? true : false}>
        <form
          className="mx-auto my-4 customForm"
          method="POST"
          onSubmit={handleSubmit}
          disabled
        >
          {message ? (
            <div className={`alert alert-${color}`} role="alert">
              {message}
            </div>
          ) : (
            <></>
          )}

          <header className="my-3">
            <h2>Create an account</h2>
            <div className="divider"></div>
          </header>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              name="cf_password"
              value={cf_password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn w-100 customBtn">
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm mx-2 text-success"
                  role="status"
                  aria-hidden="true"
                />
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
          <p className="text-center my-2">
            Already have an account?{" "}
            <Link href="/login">
              <a>Login</a>
            </Link>
          </p>
          <style jsx>
            {`
              .divider {
                border-bottom: 2px solid #b0deff;
                width: 11%;
              }
              p > a {
                color: #dc143c;
              }
              .customBtn {
                background: #e3f2fd;
                border: 1px solid #b0deff;
              }
              .customForm {
                max-width: 500px;
              }
            `}
          </style>
        </form>
      </fieldset>
    </>
  );
};

export default Register;
