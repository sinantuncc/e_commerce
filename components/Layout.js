import Modal from "./Modal";
import Navbar from "./Navbar";
import Toast from "./Toast";

const Layout = ({ children }) => (
  <>
    <Navbar />
    <Toast />
    <Modal />
    {children}
  </>
);

export default Layout;
