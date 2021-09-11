import { useState } from "react";
import Link from "next/link";
import Head from "next/head";

const Register = () => {
  const initialState = {
    username: "",
    email: "",
    password: "",
    cf_password: "",
  };

  const [userData, setUserData] = useState(initialState);
  const { username, email, password, cf_password } = userData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validation(userData); // return a message or undefined

    if (errors) {
      return dispatch(regError(errorMsg));
    } else {
      dispatch(register("auth/register", form));
    }
  };

  return (
    <>
      <Head>
        <title>E-SHOP | Register</title>
      </Head>

      <form
        className="mx-auto my-4 customForm"
        method="POST"
        onSubmit={handleSubmit}
      >
        <header className="my-3">
          <h2>Create an account</h2>
          <div className="divider"></div>
        </header>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            name="fullName"
            value={fullName}
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
          <small id="emailHelp" className="form-text text-muted">
            We will never share your email with others.
          </small>
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
          Register
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
    </>
  );
};

export default Register;
