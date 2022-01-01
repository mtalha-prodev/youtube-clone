import {
  CHANNEL_DETAILS_FAIL,
  CHANNEL_DETAILS_REQUEST,
  CHANNEL_DETAILS_SUCCESS,
  SET_SUBSCRIBES_STATUS,
} from "../actionType";

const initialState = {
  loading: true,
  channels: {},
  subscriptionStatus: false,
};

export const channelDetailsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case CHANNEL_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHANNEL_DETAILS_SUCCESS:
      return {
        ...state,
        channels: payload,
        loading: false,
      };
    case CHANNEL_DETAILS_FAIL:
      return {
        ...state,
        channels: null,
        loading: false,
        error: payload,
      };
    case SET_SUBSCRIBES_STATUS:
      return {
        ...state,
        subscriptionStatus: payload,
      };

    default:
      return state;
  }
};
