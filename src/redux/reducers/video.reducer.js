import {
  HOME_FAIL,
  HOME_REQUEST,
  HOME_SUCCESS,
  RELATED_VIDEO_FAIL,
  RELATED_VIDEO_REQUEST,
  RELATED_VIDEO_SUCCESS,
  SEARCHED_VIDEO_FAIL,
  SEARCHED_VIDEO_REQUEST,
  SEARCHED_VIDEO_SUCCESS,
  SELECTED_VIDEO_FAIL,
  SELECTED_VIDEO_REQUEST,
  SELECTED_VIDEO_SUCCESS,
  SUBSCRIPTIONS_FAIL,
  SUBSCRIPTIONS_REQUEST,
  SUBSCRIPTIONS_SUCCESS,
  CHANNEL_VIDEO_REQUEST,
  CHANNEL_VIDEO_SUCCESS,
  CHANNEL_VIDEO_FAIL,
} from "../actionType";

const initialState = {
  loading: true,
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

export const selectedVideoReducer = (
  state = { video: null, loading: true },
  { type, payload }
) => {
  switch (type) {
    case SELECTED_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SELECTED_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        video: payload,
      };
    case SELECTED_VIDEO_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export const relatedVideoReducer = (
  state = { videos: [], loading: true },
  { type, payload }
) => {
  switch (type) {
    case RELATED_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RELATED_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: payload,
      };
    case RELATED_VIDEO_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

// SEARCHED VIDEO REDUCER

export const searchedVideoReducer = (
  state = { videos: [], loading: true },
  { type, payload }
) => {
  switch (type) {
    case SEARCHED_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCHED_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: payload,
      };
    case SEARCHED_VIDEO_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

// Subscription channel VIDEO REDUCER

export const subscriptionChannelReducer = (
  state = { videos: [], loading: true },
  { type, payload }
) => {
  switch (type) {
    case SUBSCRIPTIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: payload,
      };
    case SUBSCRIPTIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

//  channel VIDEO DETAILE REDUCER

export const channelVideoReducer = (
  state = { videos: [], loading: true },
  { type, payload }
) => {
  switch (type) {
    case CHANNEL_VIDEO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHANNEL_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        videos: payload,
      };
    case CHANNEL_VIDEO_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};
