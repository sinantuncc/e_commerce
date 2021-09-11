import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = () => {
  const router = useRouter();
  const isActive = (r) => (r === router.pathname ? "active" : "");

  return (
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
                <i className="fas fa-shopping-bag mx-1" aria-hidden="true"></i>
                Cart
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/login">
              <a className={`nav-link ${isActive("/login")}`}>
                <i className="fas fa-user-circle mx-1" aria-hidden="true"></i>
                Login
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
