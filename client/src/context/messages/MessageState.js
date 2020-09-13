import React, { useReducer } from "react";
import MessageContext from "./messageContext";
import MessageReducer from "./messageReducer";
import axios from "axios";
import {
  ADD_MESSAGE,
  DELETE_MESSAGE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_MESSAGE,
  MESSAGE_ERROR,
  GET_MESSAGES,
  CLEAR_MESSAGES,
  GET_SENDERNAME,
} from "../types";

const MessageState = (props) => {
  const initialState = {
    messages: null,
    current: null,
    error: null,
  };
  const [state, dispatch] = useReducer(MessageReducer, initialState);

  //Get Messages
  const getMessages = async () => {
    try {
      const res = await axios.get("/api/messages");
      dispatch({
        type: GET_MESSAGES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: MESSAGE_ERROR,
        payload: err.response.msg,
      });
    }
  };
  //Get All Messages
  const getAllMessages = async () => {
    try {
      const res = await axios.get("/api/messages/all");
      dispatch({
        type: GET_MESSAGES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: MESSAGE_ERROR,
        payload: err.response.msg,
      });
    }
  };

  //Add Message
  const addMessage = async (message) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/messages", message, config);
      dispatch({ type: ADD_MESSAGE, payload: res.data });
    } catch (err) {
      dispatch({ type: MESSAGE_ERROR, payload: err.response.msg });
    }
  };

  //Delete Message
  const deleteMessage = async (id) => {
    try {
      await axios.delete(`/api/messages/${id}`);
      dispatch({ type: DELETE_MESSAGE, payload: id });
    } catch (err) {
      dispatch({ type: MESSAGE_ERROR, payload: err.response.msg });
    }
  };

  // Clear Messages
  const clearMessages = () => {
    dispatch({ type: CLEAR_MESSAGES });
  };

  // Set current Message
  const setCurrent = (message) => {
    dispatch({ type: SET_CURRENT, payload: message });
  };
  // clear current message
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  // update message
  const updateMessage = async (message) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `/api/messages/${message._id}`,
        message,
        config
      );
      dispatch({ type: UPDATE_MESSAGE, payload: res.data });
    } catch (err) {
      dispatch({ type: MESSAGE_ERROR, payload: err.response.msg });
    }
  };

  return (
    <MessageContext.Provider
      value={{
        messages: state.messages,
        current: state.current,
        error: state.error,
        addMessage,
        deleteMessage,
        setCurrent,
        clearCurrent,
        updateMessage,
        getMessages,
        clearMessages,
        getAllMessages,
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageState;
