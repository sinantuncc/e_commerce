import { useEffect, useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { getData } from "../utils/fetchData";
import { auth } from "./actions/auth";
import rootReducer from "./reducers";
import { useLocalStorage } from "../hooks/useLocalStorage";

let store;

function initStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }

  if (typeof window === "undefined") return _store;
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);

  const [localAuth, setLocalAuth] = useLocalStorage("_auth_", {});
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");

    firstLogin || setLocalAuth({});

    if (firstLogin) {
      getData("auth/accessToken").then((res) => {
        if (!res.success) {
          localStorage.removeItem("firstLogin");
          setLocalAuth({});
          return;
        }
        store.dispatch(
          auth({
            isLogged: true,
            token: res.access_token,
            user: res.user,
          })
        );

        setLocalAuth({ ...res.user, isLogged: true });
      });
    }
  }, []);

  return store;
}
