import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Cookie from "js-cookie";
import { auth } from "../store/actions/auth";
import { notifySuccess } from "../store/actions/notify";

const Navbar = () => {
  const router = useRouter();
  const isActive = (r) => (r === router.pathname ? "active" : "");

  const { isLogged, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

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
          className="nav-link dropdown-toggle d-inline-flex align-items-center"
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
                width="25"
                height="25"
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
          <a className="dropdown-item">Profile</a>

          <button className="dropdown-item" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </li>
    );
  };
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <Link href="/">
          <a className="navbar-brand">
            <i className="fas fa-store-alt mx-1" aria-hidden="true"></i>E-SHOP
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
          className="collapse navbar-collapse justify-content-end "
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/cart">
                <a className={`nav-link ${isActive("/cart")}`}>
                  <i
                    className="fas fa-shopping-bag mx-1"
                    aria-hidden="true"
                  ></i>
                  Cart
                </a>
              </Link>
            </li>

            {isLogged ? (
              loggedRouter()
            ) : (
              <li className="nav-item">
                <Link href="/login">
                  <a className={`nav-link ${isActive("/login")}`}>
                    <i
                      className="fas fa-user-circle mx-1"
                      aria-hidden="true"
                    ></i>
                    Login
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
