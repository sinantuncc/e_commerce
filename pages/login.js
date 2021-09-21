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

const initialValue = {
  usernameOrEmail: "",
  password: "",
  rememberMe: false,
};

const Login = () => {
  const [userData, setUserData] = useState(initialValue);
  const { usernameOrEmail, password, rememberMe } = userData;

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.loading);
  const { isLogged } = useSelector((state) => state.auth);

  useEffect(() => {
    let { cb } = router.query;

    if (isLogged) cb ? router.push(cb) : router.push("/");
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
        expires: rememberMe ? 7 : 1,
      });

      localStorage.setItem("firstLogin", true);
      localStorage.setItem(
        "_auth_",
        JSON.stringify({ ...result.user, isLogged: true })
      );
    } else {
      dispatch(notifyError(result.message));
    }
    dispatch(load(false));
  };

  return (
    <div className="mx-3">
      <Head>
        <title>Login</title>
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
              checked={rememberMe}
              onChange={(e) =>
                setUserData({ ...userData, rememberMe: e.target.checked })
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
        </form>
      </fieldset>
    </div>
  );
};

export default Login;
