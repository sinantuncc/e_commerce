import { Provider } from "react-redux";
import { useStore } from "../store/store";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Layout store={store}>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
