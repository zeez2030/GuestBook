import React, { Fragment, useContext, useState } from "react";
import PropTypes from "prop-types";
import AuthContext from "../../context/auth/authContext";
import MessageContext from "../../context/messages/messageContext";
import ReplyItem from "./ReplyItem";
const MessageItem = ({ message }) => {
  const authContext = useContext(AuthContext);
  const messageContext = useContext(MessageContext);
  const { user } = authContext;
  const {
    current,
    setCurrent,
    clearCurrent,
    deleteMessage,
    updateMessage,
    addReply,
  } = messageContext;
  const { _id, body, comments, username } = message;
  const [editedMessage, setEditedMessage] = useState(body);
  const [comment, setComment] = useState({
    username: "",
    body: "",
  });

  let mine = user && user.name === username ? true : false;
  const onDelete = () => {
    deleteMessage(_id);
    clearCurrent();
  };
  const edit = () => {
    message.body = editedMessage;
    updateMessage(message);
    clearCurrent();
  };
  const setCurrentMessage = () => setCurrent(message);
  const onChange = (e) => {
    setEditedMessage(e.target.value);
  };
  const onChangeComment = (e) => {
    setComment({
      body: e.target.value,
      username: user.name,
    });
  };
  const addComment = () => {
    if (comment.body === "") return;
    addReply(comment, _id);
    setComment({ body: "", username: "" });
  };
  return (
    <div
      style={mine ? { backgroundColor: "#ddd" } : {}}
      className="card bg-light"
    >
      <p className="lead">{username}</p>
      <p className="my-1 text-primary text-center">{body}</p>
      <p>
        {mine ? (
          <Fragment>
            {current && current._id === _id ? (
              <button onClick={edit} className="btn btn-dark btn-sm">
                Edit
              </button>
            ) : (
              <button
                onClick={setCurrentMessage}
                className="btn btn-dark btn-sm"
              >
                Edit
              </button>
            )}

            <button className="btn btn-dark btn-sm" onClick={addComment}>
              reply
            </button>
            <button className="btn btn-danger btn-sm" onClick={onDelete}>
              Delete
            </button>
            {current && current._id === _id ? (
              <input
                type="text"
                placeholder="click edit button again to edit the message.."
                value={editedMessage}
                onChange={onChange}
              />
            ) : null}
          </Fragment>
        ) : (
          <button className="btn btn-dark btn-sm" onClick={addComment}>
            reply
          </button>
        )}
        <input
          type="text"
          placeholder="click reply button to add  the comment.."
          value={comment.body}
          onChange={onChangeComment}
        />
      </p>
      {comments && comments.length > 0 ? (
        <ul className="list my-2">
          {comments.map((comment) => {
            return (
              <li className="bg-dark" key={comment._id}>
                <div className="p-1">
                  <ReplyItem username={comment.username} body={comment.body} />
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

MessageItem.propTypes = {
  message: PropTypes.object.isRequired,
};
export default MessageItem;
