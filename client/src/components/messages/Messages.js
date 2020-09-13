import React, { Fragment, useContext, useEffect, useState } from "react";
import MessageContext from "../../context/messages/messageContext";
import MessageItem from "./MessageItem";
const Messages = () => {
  const messageContext = useContext(MessageContext);
  const { messages, getAllMessages, addMessage } = messageContext;
  const [message, setMessage] = useState({
    body: "",
  });
  useEffect(() => {
    getAllMessages();

    // eslint-disable-next-line
  }, []);
  const onChange = (e) =>
    setMessage({
      body: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    addMessage(message);
  };
  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="add message"
          value={message.body}
          name="body"
          onChange={onChange}
        />
        <input
          type="submit"
          value="add message"
          className="btn btn-primary btn-block"
        />
      </form>
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
