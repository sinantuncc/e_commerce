/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { useState } from "react";
import Head from "next/head";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
    checked: false,
  };

  const [userData, setUserData] = useState(initialState);
  const { email, password, checked } = userData;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value, checked: !checked });
  };

  return (
    <>
      <Head>
        <title>E-SHOP | Login</title>
      </Head>

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
          <label>Email</label>
          <input
            type="email"
            className="form-control"
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
            name="checked"
            onChange={handleChange}
          />
          <label className="form-check-label">Remember me</label>
        </div>
        <button type="submit" className="btn w-100 customBtn">
          Login
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
    </>
  );
};

export default Login;
