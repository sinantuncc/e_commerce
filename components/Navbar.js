import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Cookie from "js-cookie";
import { auth } from "../store/actions/auth";
import { notifySuccess } from "../store/actions/notify";
import { FcShop } from "react-icons/fc";
import { FaShoppingBag } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const { isLogged, user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const router = useRouter();

  const isActive = (r) => (r === router.pathname ? "active" : "");

  const handleLogout = () => {
    Cookie.remove("refreshtoken", { path: "api/auth/accessToken" });
    localStorage.removeItem("firstLogin");
    dispatch(auth({}));
    dispatch(notifySuccess("Logout success!"));
  };

  const loggedRouter = () => {
    return (
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown d-inline-flex align-items-center"
          id="navbarDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="d-inline-flex">
            <span className="rounded-circle mr-1">
              <Image
                src={user.avatar}
                width="25px"
                height="25px"
                alt="profile-img"
              />
            </span>
            {user.username}
          </span>
        </a>
        <div
          className="dropdown-menu dropdown-menu-right"
          aria-labelledby="navbarDropdown"
        >
          <Link href={user.username}>
            <a className="dropdown-item">Profile</a>
          </Link>
          <button className="dropdown-item" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </li>
    );
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#e3f2fd", padding: "4px 16px" }}
    >
      <Link href="/">
        <a className="navbar-brand d-inline-flex align-items-center">
          <FcShop size="1.4em" className="mr-1" />
          <b>DIKAN</b>
        </a>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link href="/cart">
              <a
                className={`nav-link ${isActive(
                  "/cart"
                )} d-inline-flex align-items-center`}
              >
                <FaShoppingBag className="mr-1" />
                Cart
                <span className="badge badge-pill badge-danger ml-1 py-1">
                  {cart.length > 0 && cart.length}
                </span>
              </a>
            </Link>
          </li>

          {isLogged ? (
            loggedRouter()
          ) : (
            <li className="nav-item">
              <Link href="/login">
                <a
                  className={`nav-link ${isActive(
                    "/login"
                  )} d-inline-flex align-items-center`}
                >
                  <FaUser className="mr-1" />
                  Login
                </a>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
