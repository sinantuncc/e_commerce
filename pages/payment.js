import { useEffect, useState } from "react";
import validator from "validator";
import Head from "next/head";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import router from "next/router";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { postData } from "../utils/fetchData";
import { notifyError } from "../store/actions/notify";
import { GiConfirmed } from "react-icons/gi";
import { resetCart } from "../store/actions/cart";
import { validateFullname, validatePhoneNumber } from "../utils/validForm";
import { load } from "../store/actions/loading";

const initialValue = {
  fullName: "",
  mobile: "",
  address: "",
  creditCard: "",
  validThru: "",
  cvv: "",
  disCoupon: "",
};

const Payment = () => {
  const { loading, auth, cart } = useSelector((state) => state);
  const [steps, setSteps] = useState(0);

  const [userData, setUserData] = useState(initialValue);
  const { fullName, mobile, address, creditCard, validThru, cvv, disCoupon } =
    userData;
  const [discount, setDiscount] = useState(null);

  const dispatch = useDispatch();

  const [localAuth] = useLocalStorage("_auth_");
  const [localCart] = useLocalStorage("_cart_");

  useEffect(() => {
    if (!localAuth)
      return router.push(`/login?cb=${encodeURIComponent("/payment")}`);
    if (!localCart?.length) return router.push("/");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleShippingInfo = (e) => {
    e.preventDefault();

    if (!validateFullname(fullName))
      return dispatch(notifyError("Invalid name"));
    if (!validatePhoneNumber(mobile))
      return dispatch(notifyError("Invalid phone number"));
    if (!(address.length > 10 || address < 150))
      return dispatch(notifyError("Invalid address"));

    setSteps(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validator.isCreditCard(creditCard))
      return dispatch(notifyError("Invalid credit cart number"));

    createOrder();
  };

  const getTotal = (sale) => {
    const result = cart.reduce(
      (prev, item) => prev + item.price * item.quantity,
      0
    );

    if (sale) return result - (result / 100) * sale;

    return result;
  };

  const createOrder = async () => {
    dispatch(load(true));
    const total = getTotal();
    const data = {
      fullName,
      mobile,
      address,
      cart,
      total,
    };
    const res = await postData("order", data, auth.token);
    const { success, message } = res;

    if (success) {
      setSteps(2);
      dispatch(resetCart());
      localStorage.removeItem("_cart_");
    } else {
      dispatch(notifyError(message));
    }
    dispatch(load(false));
  };

  const handleDisCoupon = () => {
    disCoupon.toUpperCase() === "SEP10"
      ? setDiscount(true)
      : setDiscount(false);
  };

  const cartSummary = () => (
    <div className="mx-auto" style={{ maxWidth: "500px" }}>
      <h4 className="my-2">Cart Summary</h4>
      <div className="divider"></div>
      {cart.map((item) => (
        <div key={item._id}>
          <div className="text-capitalize  my-3" key={item._id}>
            {item.title} &#10006; {item.quantity} = {item.price * item.quantity}
          </div>
          <div className="border-bottom">Price: ${item.price}</div>
        </div>
      ))}
      <h5 className="my-4">
        Total:{" "}
        {discount ? (
          <>
            <span
              className="text-danger"
              style={{ textDecoration: "line-through" }}
            >
              ${getTotal()}
            </span>
            <span className="text-success"> ${getTotal(10)}</span>
          </>
        ) : (
          <span className="text-danger"> ${getTotal()}</span>
        )}
      </h5>

      <div>
        <h6>Discount Coupon</h6>
        <div className="d-flex justify-content-between">
          <input
            className="form-control mr-2 text-uppercase"
            name="disCoupon"
            onChange={handleChange}
            value={disCoupon}
          />

          <button className="btn btn-info ml-2" onClick={handleDisCoupon}>
            Apply
          </button>
        </div>
        <div>
          {discount === null ? (
            <small>
              <i>Demo discount coupon: SEP10 </i>
            </small>
          ) : discount ? (
            <div className="bg-success p-1 m-1 text-white">
              Congratulations, you have won a discount!
            </div>
          ) : (
            <div className="bg-warning p-1 m-1 ">
              Opps, invalid discount coupon!
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const paymentInfo = () => {
    return (
      <div className="row m-4">
        <div className="col-md-6">{cartSummary()}</div>
        <div className="col-md-6">
          <div className="mx-3">
            <fieldset disabled={loading ? true : false}>
              <form
                className="mx-auto customForm"
                method="POST"
                onSubmit={handleSubmit}
              >
                <h4 className="my-2">Add your credit card information</h4>
                <div className="divider"></div>
                <div className="form-group my-3">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="fullName"
                    value={fullName}
                    onChange={handleChange}
                    placeholder="John Snow"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Credit Card Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="creditCard"
                    value={creditCard}
                    onChange={handleChange}
                    placeholder="0808 0808 0808 0808"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Valid Thru</label>
                  <input
                    type="text"
                    className="form-control"
                    name="validThru"
                    value={validThru}
                    onChange={handleChange}
                    placeholder="11/23"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="number"
                    className="form-control"
                    name="cvv"
                    value={cvv}
                    onChange={handleChange}
                    placeholder="123"
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
                    "Payment"
                  )}
                </button>
              </form>
            </fieldset>
          </div>
        </div>
      </div>
    );
  };

  const shippingInfo = () => (
    <div className="mx-3">
      <form
        className="mx-auto my-4 customForm"
        method="POST"
        onSubmit={handleShippingInfo}
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
            name="fullName"
            value={fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mobile</label>
          <input
            type="text"
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
          Continue
        </button>
      </form>
    </div>
  );

  const greetingPage = () => {
    return (
      <div className="m-5 p-5 text-center">
        <GiConfirmed size="5em" className="my-2" color="green" />
        <h2>Congratulations!</h2>
        <p>Your order successfully created!</p>
        <Link href="/">
          <a className="btn btn-success mx-1">HOME</a>
        </Link>
        <Link href="#">
          <a className="btn btn-info mx-1">SEE DETAILS</a>
        </Link>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Payment</title>
      </Head>

      {steps === 2
        ? greetingPage()
        : steps === 1
        ? paymentInfo()
        : shippingInfo()}
    </>
  );
};

export default Payment;
