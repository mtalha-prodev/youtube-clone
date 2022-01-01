import moment from "moment";
import React from "react";
import "./_comment.scss";

const Comment = ({ comment }) => {
  const { authorProfileImageUrl, publishedAt, authorDisplayName, textDisplay } =
    comment;

  // console.log(videoComment);

  return (
    <div className="comment">
      <img src={authorProfileImageUrl} alt="" />
      <div className="comment__body">
        <p className="comment__body__heading">
          {authorDisplayName} •<span> {moment(publishedAt).fromNow()} </span>
        </p>
        <p>{textDisplay}</p>
      </div>
    </div>
  );
};

export default Comment;
