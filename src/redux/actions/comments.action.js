import request from "../../api";
import {
  ADD_COMMENT_FAIL,
  ADD_COMMENT_SUCCESS,
  COMMENTS_FAIL,
  COMMENTS_REQUEST,
  COMMENTS_SUCCESS,
} from "../actionType";

export const getCommentById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: COMMENTS_REQUEST,
    });
    const { data } = await request("/commentThreads", {
      params: {
        part: "snippet",
        videoId: id,
      },
    });

    dispatch({
      type: COMMENTS_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: COMMENTS_FAIL,
      payload: error.response.data,
    });
  }
};

// insert comment

export const addComment = (id, text) => async (dispatch, getState) => {
  try {
    // SET VALUE INSERT IN COMMENT LOCATION
    const obj = {
      snippet: {
        videoId: id,
        topLevelComment: {
          snippet: {
            textOriginal: text,
          },
        },
      },
    };

    await request.post("/commentThreads", obj, {
      params: {
        part: "snippet",
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    dispatch({
      type: ADD_COMMENT_SUCCESS,
    });

    setTimeout(() => dispatch(getCommentById(id)), 5000);
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: ADD_COMMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};
