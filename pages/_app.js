import { Provider } from "react-redux";
import { useStore } from "../store/store";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  const { cart } = store.getState().cart;

  const [localCart] = useLocalStorage("_cart_", cart);

  useEffect(() => {
    if (localCart.length)
      store.dispatch({ type: "ADD_CART", payload: localCart });
  }, []);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
