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
  FILTER_MESSAGES,
  CLEAR_FILTER,
  MESSAGE_ERROR,
  GET_MESSAGES,
  CLEAR_MESSAGES,
} from "../types";

const MessageState = (props) => {
  const initialState = {
    messages: null,
    current: null,
    error: null,
  };
  const [state, dispatch] = useReducer(MessageReducer, initialState);

  //Get Messages
  const getMessages = async () => {};

  //Add Message
  const addMessage = async (message) => {};

  //Delete Message
  const deleteMessage = async (id) => {};

  // Clear Messages
  const clearMessages = () => {};

  // Set current Message
  const setCurrent = (message) => {};
  // clear current message
  const clearCurrent = () => {};
  // update message
  const updateMessage = async (message) => {};

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
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessageState;
