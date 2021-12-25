import { HOME_FAIL, HOME_REQUEST, HOME_SUCCESS } from "../actionType";

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
    console.log(data);

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
      console.log(error.massege);
      dispatch({
        type: HOME_FAIL,
        payload: error.massege,
      });
    }
  };
