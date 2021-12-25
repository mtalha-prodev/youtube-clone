import { HOME_FAIL, HOME_REQUEST, HOME_SUCCESS } from "../actionType";

const initialState = {
  loading: false,
  videos: [],
  nextPageToken: null,
  activeCategory: "All",
};

export const videoReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case HOME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case HOME_SUCCESS:
      return {
        ...state,
        loading: false,
        videos:
          state.activeCategory === payload.category
            ? [...state.videos, ...payload.videos]
            : payload.videos,
        nextPageToken: payload.nextPageToken,
        activeCategory: payload.category,
      };
    case HOME_FAIL:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};
