import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import {
  videoReducer,
  selectedVideoReducer,
  relatedVideoReducer,
  searchedVideoReducer,
  subscriptionChannelReducer,
  channelVideoReducer,
} from "./video.reducer";
import { channelDetailsReducer } from "./channel.reducer";
import { commentsListReducer } from "./comment.reducer";

const reducer = combineReducers({
  auth: authReducer,
  homeVideos: videoReducer,
  selectedVideo: selectedVideoReducer,
  channelDetails: channelDetailsReducer,
  commentsList: commentsListReducer,
  relatedVideos: relatedVideoReducer,
  searchedVideo: searchedVideoReducer,
  subscriptionChannel: subscriptionChannelReducer,
  channelVideo: channelVideoReducer,
});

export default reducer;
