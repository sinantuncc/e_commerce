import Navbar from "./Navbar";
import Toast from "./Toast";

const Layout = ({ children }) => (
  <>
    <Navbar />
    <Toast />
    {children}
  </>
);

export default Layout;
