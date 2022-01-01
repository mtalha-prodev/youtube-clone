import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addComment,
  getCommentById,
} from "../../redux/actions/comments.action";
import Comment from "../comment/Comment";

import "./_comments.scss";

const Comments = ({ videoId, totalComments }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentById(videoId));
  }, [dispatch, videoId]);

  const [text, setText] = useState("");

  const comments = useSelector((state) => state.commentsList.comments);

  const _comments = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length === 0) return;

    dispatch(addComment(videoId, text));

    setTimeout(() => setText(""), 3000);
  };

  return (
    <div className="comments">
      <h5>{totalComments} Comments</h5>

      <div className="comments__form d-flex">
        <img
          src="http://user.dobe3.com/2be3/assets/global/images/avatars/avatar1.png"
          alt="avatar"
        />

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Write a comment ..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="btn">Comment</button>
        </form>
      </div>
      {_comments?.map((comment, i) => (
        <Comment comment={comment} key={i} />
      ))}
    </div>
  );
};

export default Comments;
