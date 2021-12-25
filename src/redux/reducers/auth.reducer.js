import {
  LOAD_PROFILE,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT,
} from "../actionType";

const localStorageGetToken = localStorage.getItem("ytc-access-token")
  ? localStorage.getItem("ytc-access-token")
  : null;
const localStorageGetUser = localStorage.getItem("ytc-user")
  ? JSON.parse(localStorage.getItem("ytc-user"))
  : null;

const initialState = {
  accessToken: localStorageGetToken,
  user: localStorageGetUser,
  loading: false,
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: payload,
        loading: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case LOAD_PROFILE:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case LOG_OUT:
      return {
        ...state,
        accessToken: null,
        user: null,
        loading: false,
      };

    default:
      return state;
  }
};
