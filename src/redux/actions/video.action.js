import {
  HOME_FAIL,
  HOME_REQUEST,
  HOME_SUCCESS,
  RELATED_VIDEO_FAIL,
  RELATED_VIDEO_REQUEST,
  RELATED_VIDEO_SUCCESS,
  SELECTED_VIDEO_FAIL,
  SELECTED_VIDEO_REQUEST,
  SELECTED_VIDEO_SUCCESS,
  SEARCHED_VIDEO_FAIL,
  SEARCHED_VIDEO_REQUEST,
  SEARCHED_VIDEO_SUCCESS,
  SUBSCRIPTIONS_REQUEST,
  SUBSCRIPTIONS_SUCCESS,
  SUBSCRIPTIONS_FAIL,
  CHANNEL_VIDEO_REQUEST,
  CHANNEL_VIDEO_SUCCESS,
  CHANNEL_VIDEO_FAIL,
} from "../actionType";

import request from "../../api";

export const getPopularVideo = () => async (dispatch, getState) => {
  try {
    dispatch({ type: HOME_REQUEST });

    const { data } = await request("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "PK",
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
      },
    });

    dispatch({
      type: HOME_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: "All",
      },
    });
  } catch (error) {
    console.log(error.massege);
    dispatch({
      type: HOME_FAIL,
      payload: error.massege,
    });
  }
};

// video search in caterory

export const getVideosByCategories =
  (kayword) => async (dispatch, getState) => {
    try {
      dispatch({ type: HOME_REQUEST });

      const { data } = await request("/search", {
        params: {
          part: "snippet",
          maxResults: 20,
          q: kayword,
          pageToken: getState().homeVideos.nextPageToken,
        },
      });

      dispatch({
        type: HOME_SUCCESS,
        payload: {
          videos: data.items,
          nextPageToken: data.nextPageToken,
          category: kayword,
        },
      });
    } catch (error) {
      dispatch({
        type: HOME_FAIL,
        payload: error.massege,
      });
    }
  };

// get video by id

export const getVideoById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SELECTED_VIDEO_REQUEST,
    });
    const { data } = await request("/videos", {
      params: {
        part: "snippet, statistics",
        id: id,
      },
    });

    dispatch({
      type: SELECTED_VIDEO_SUCCESS,
      payload: data.items[0],
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SELECTED_VIDEO_FAIL,
      payload: error.message,
    });
  }
};

export const getRelatedVideos = (id) => async (dispatch) => {
  try {
    dispatch({
      type: RELATED_VIDEO_REQUEST,
    });

    const { data } = await request("/search", {
      params: {
        part: "snippet",
        relatedToVideoId: id,
        maxResults: 15,
        type: "video",
      },
    });

    dispatch({
      type: RELATED_VIDEO_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: RELATED_VIDEO_FAIL,
      payload: error.response.data.massege,
    });
  }
};

// search with query
export const getVideosBySearched = (kayword) => async (dispatch) => {
  try {
    dispatch({ type: SEARCHED_VIDEO_REQUEST });

    const { data } = await request("/search", {
      params: {
        part: "snippet",
        maxResults: 20,
        q: kayword,
        type: "video,channel",
      },
    });

    dispatch({
      type: SEARCHED_VIDEO_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    dispatch({
      type: SEARCHED_VIDEO_FAIL,
      payload: error.massege,
    });
  }
};

// subscriptions
export const getSubsctiptionChannel = () => async (dispatch, getState) => {
  // getState using to store access udear reducer
  try {
    dispatch({
      type: SUBSCRIPTIONS_REQUEST,
    });

    const { data } = await request("/subscriptions", {
      params: {
        part: "snippet, contentDetails",
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });

    dispatch({
      type: SUBSCRIPTIONS_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    dispatch({
      type: SUBSCRIPTIONS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get Video by channel
export const getVideoByPlaylist = (id) => async (dispatch) => {
  // getState using to store access udear reducer
  try {
    dispatch({
      type: CHANNEL_VIDEO_REQUEST,
    });

    // 1 get the playlist id
    const {
      data: { items },
    } = await request("/channels", {
      params: {
        part: "contentDetails",
        id: id,
      },
    });

    const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads;

    // get the playlist using id

    const { data } = await request("/playlistItems", {
      params: {
        part: "snippet,contentDetails",
        playlistId: uploadPlaylistId,
        maxResults: 30,
      },
    });

    console.log(data.items);

    dispatch({
      type: CHANNEL_VIDEO_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    dispatch({
      type: CHANNEL_VIDEO_FAIL,
      payload: error.response.data.message,
    });
  }
};
