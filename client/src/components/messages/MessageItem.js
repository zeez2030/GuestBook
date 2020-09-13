import React, { Fragment, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import AuthContext from "../../context/auth/authContext";
import MessageContext from "../../context/messages/messageContext";
const MessageItem = ({ message }) => {
  const authContext = useContext(AuthContext);
  const messageContext = useContext(MessageContext);
  const { user } = authContext;
  const { getSenderName, senderName, deleteMessage } = messageContext;
  const { _id, body, comments, username } = message;

  console.log(_id);
  let mine = user.name == username ? true : false;
  const onDelete = () => {
    deleteMessage(_id);
  };
  return (
    <div
      style={mine ? { backgroundColor: "#ddd" } : {}}
      className="card bg-light"
    >
      <p className="lead">{username}</p>
      <p>{body}</p>
      <p>
        {mine ? (
          <Fragment>
            <button className="btn btn-dark btn-sm">Edit</button>
            <button className="btn btn-dark btn-sm">reply</button>
            <button className="btn btn-danger btn-sm" onClick={onDelete}>
              Delete
            </button>
          </Fragment>
        ) : (
          <button className="btn btn-dark btn-sm">reply</button>
        )}
      </p>
    </div>
  );
};

MessageItem.propTypes = {
  message: PropTypes.object.isRequired,
};
export default MessageItem;
