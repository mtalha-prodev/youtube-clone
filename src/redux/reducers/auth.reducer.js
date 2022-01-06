import {
  LOAD_PROFILE,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT,
} from "../actionType";

const sessionStorageGetToken = sessionStorage.getItem("ytc-access-token")
  ? sessionStorage.getItem("ytc-access-token")
  : null;
const sessionStorageGetUser = sessionStorage.getItem("ytc-user")
  ? JSON.parse(sessionStorage.getItem("ytc-user"))
  : null;

const initialState = {
  accessToken: sessionStorageGetToken,
  user: sessionStorageGetUser,
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
