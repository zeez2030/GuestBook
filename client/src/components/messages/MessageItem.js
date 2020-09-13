import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import AuthContext from "../../context/auth/authContext";
import MessageContext from "../../context/messages/messageContext";
const MessageItem = ({ message }) => {
  const authContext = useContext(AuthContext);
  const messageContext = useContext(MessageContext);
  const { user } = authContext;
  const { getSenderName, senderName } = messageContext;
  const { _id, body, comments } = message;
  const senderID = message.user;

  useEffect(() => {
    getSenderName(_id);
    // eslint-disable-next-line
  }, []);

  {
    return (
      senderName && (
        <div
          style={user._id === senderID ? { backgroundColor: "#ddd" } : {}}
          className="card bg-light"
        >
          <p className="lead">{senderName}</p>
          <p>{body}</p>
        </div>
      )
    );
  }
};

MessageItem.propTypes = {
  message: PropTypes.object.isRequired,
};
export default MessageItem;
