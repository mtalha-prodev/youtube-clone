import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { videoReducer } from "./video.reducer";

const reducer = combineReducers({
  auth: authReducer,
  homeVideos: videoReducer,
});

export default reducer;
