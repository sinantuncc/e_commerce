import { useState } from "react";

export const useLocalStorage = (key, initialState) => {
  const [state, setstate] = useState(() => {
    try {
      const storage = localStorage.getItem(key);
      return storage ? JSON.parse(storage) : initialState;
    } catch (error) {
      return initialState;
    }
  });

  const updateState = (value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return setstate(value);
    } catch (error) {}
  };

  return [state, updateState];
};
