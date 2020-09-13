import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    error: null,
    user: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Load User
  const loadUser = async () => {};

  // Register User
  const register = async (formData) => {};
  // Login User
  const login = async (formData) => {};
  // Logout
  const logout = () => {};
  // Clear Errors
  const clearErrors = () => {};
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        user: state.user,
        register,
        clearErrors,
        loadUser,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
