import {
  ADD_COMMENT_FAIL,
  ADD_COMMENT_SUCCESS,
  COMMENTS_FAIL,
  COMMENTS_REQUEST,
  COMMENTS_SUCCESS,
} from "../actionType";

export const commentsListReducer = (
  state = { comments: null, loading: true },
  { type, payload }
) => {
  switch (type) {
    case COMMENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COMMENTS_SUCCESS:
      return {
        ...state,
        comments: payload,
        loading: false,
      };
    case COMMENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ADD_COMMENT_FAIL:
      return {
        ...state,
        loading: false,
        createError: payload,
      };

    default:
      return state;
  }
};
