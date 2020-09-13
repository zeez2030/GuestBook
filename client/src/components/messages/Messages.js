import React, { Fragment, useContext, useEffect } from "react";
import MessageContext from "../../context/messages/messageContext";
import MessageItem from "./MessageItem";
const Messages = () => {
  const messageContext = useContext(MessageContext);
  const { messages, getMessages, getAllMessages } = messageContext;

  useEffect(() => {
    getAllMessages();

    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {messages && messages.length !== 0 ? (
        messages.map((message) => (
          <MessageItem message={message} key={message._id} />
        ))
      ) : (
        <h2>No messages, Add One</h2>
      )}
    </Fragment>
  );
};

export default Messages;
