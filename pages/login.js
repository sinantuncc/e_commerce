/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { useEffect, useState } from "react";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { notifyError, notifySuccess } from "../store/actions/notify";
import { load } from "../store/actions/loading";
import { postData } from "../utils/fetchData";
import Cookie from "js-cookie";
import { auth } from "../store/actions/auth";
import router from "next/router";

const initialState = {
  usernameOrEmail: "",
  password: "",
  checked: false,
};

const Login = () => {
  const [userData, setUserData] = useState(initialState);
  const { usernameOrEmail, password, checked } = userData;

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.loading);
  const { isLogged } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLogged) router.push("/");
  }, [isLogged]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  const login = async () => {
    dispatch(load(true));

    const form = {
      usernameOrEmail: usernameOrEmail.trim(),
      password: password.trim(),
    };

    const result = await postData("auth/login", form);
    if (result.success) {
      dispatch(notifySuccess(result.message));

      dispatch(
        auth({
          isLogged: true,
          token: result.access_token,
          user: result.user,
        })
      );

      Cookie.set("refreshtoken", result.refresh_token, {
        path: "api/auth/accessToken",
        expires: checked ? 7 : 1,
      });

      localStorage.setItem("firstLogin", true);
    } else {
      dispatch(notifyError(result.message));
    }
    dispatch(load(false));
  };

  return (
    <>
      <Head>
        <title>E-SHOP | Login</title>
      </Head>
      <fieldset disabled={loading ? true : false}>
        <form
          className="mx-auto my-4 customForm"
          method="POST"
          onSubmit={handleSubmit}
        >
          <header className="my-3">
            <h2>Login</h2>
            <div className="divider"></div>
          </header>
          <div className="form-group">
            <label>Username or Email</label>
            <input
              type="text"
              className="form-control"
              name="usernameOrEmail"
              value={usernameOrEmail}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={handleChange}
              name="password"
              required
            />
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={checked}
              onChange={(e) =>
                setUserData({ ...userData, checked: e.target.checked })
              }
            />
            <label className="form-check-label">Remember me</label>
          </div>
          <button type="submit" className="btn w-100 customBtn">
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm mx-2 text-success"
                  role="status"
                  aria-hidden="true"
                />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
          <p className="text-center my-2">
            Don't have an account?{" "}
            <Link href="/register">
              <a>Register</a>
            </Link>
          </p>
          <style jsx>
            {`
              .divider {
                border-bottom: 2px solid #b0deff;
                width: 8%;
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

export default Login;
