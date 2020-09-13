import {
  ADD_MESSAGE,
  DELETE_MESSAGE,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_MESSAGE,
  MESSAGE_ERROR,
  GET_MESSAGES,
  CLEAR_MESSAGES,
  ADD_REPLY,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [action.payload, ...state.messages],
      };
    case UPDATE_MESSAGE:
    case ADD_REPLY:
      return {
        ...state,
        messages: state.messages.map((message) =>
          message._id === action.payload._id ? action.payload : message
        ),
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(
          (message) => message._id !== action.payload
        ),
      };
    case CLEAR_MESSAGES:
      return {
        ...state,
        messages: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case MESSAGE_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
