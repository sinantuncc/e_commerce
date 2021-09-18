import { useEffect, useState } from "react";
import Head from "next/head";
import { useSelector } from "react-redux";

const initialValue = {
  fullName: "",
  mobile: "",
  address: "",
};

const Payment = () => {
  const [userData, setUserData] = useState(initialValue);
  const { fullName, mobile, address } = userData;

  const { loading } = useSelector((state) => state.loading);
  const { isLogged } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Head>
        <title>Payment</title>
      </Head>
      {cart && cart.length && isLogged ? (
        <div className="mx-3">
          <fieldset disabled={loading ? true : false}>
            <form
              className="mx-auto my-4 customForm"
              method="POST"
              onSubmit={handleSubmit}
            >
              <header className="my-3">
                <h2>Add your information</h2>
                <div className="divider"></div>
              </header>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mobile</label>
                <input
                  type="number"
                  className="form-control"
                  name="mobile"
                  value={mobile}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea
                  type="textarea"
                  className="form-control"
                  name="address"
                  value={address}
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
                    Please wait...
                  </>
                ) : (
                  "Continue"
                )}
              </button>
            </form>
          </fieldset>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Payment;
