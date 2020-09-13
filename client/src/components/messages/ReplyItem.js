import React, { Fragment } from "react";

const ReplyItem = ({ username, body }) => {
  return (
    <Fragment>
      <p className="">{username}:</p>
      <span className="text-right">{body}</span>
      <hr />
    </Fragment>
  );
};
export default ReplyItem;
