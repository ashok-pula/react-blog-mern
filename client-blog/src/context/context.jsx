import { createContext, useContext, useEffect, useReducer } from "react";
import Reducer from "./reducer";
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  // console.log(useReducer(Reducer, INITIAL_STATE));
  // console.log(useReducer(Reducer, INITIAL_STATE));
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  // console.log(dispatch);
  console.log(state);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);
  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
