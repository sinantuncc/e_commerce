import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Modal from "./Modal";
import Navbar from "./Navbar";
import Toast from "./Toast";

const Layout = ({ store, children }) => {
  const { cart, auth } = store.getState();
  const [localCart] = useLocalStorage("_cart_", cart);

  useEffect(() => {
    if (localCart.length)
      store.dispatch({ type: "ADD_CART", payload: localCart });
  }, []);

  return (
    <>
      <Navbar />
      <Toast />
      <Modal />
      {children}
    </>
  );
};

export default Layout;
