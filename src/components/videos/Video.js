import React, { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import request from "../../api";
import moment from "moment";
import numeral from "numeral";

import "./_video.scss";
import { useNavigate } from "react-router";

const Video = ({ video, channelScreen }) => {
  const navigate = useNavigate();

  // destroctures to video all using data sent props
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
    contentDetails,
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  // the value of duration set in minutes and second using "utc" code to format
  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const _videoId = id?.videoId || contentDetails?.videoId || id;

  useEffect(() => {
    const getVideoDetails = async () => {
      /* array kay ander sy items ki value lanay ga derect tarika like without destracturing "data.items" and destructure way {data:{items}} */
      // catch the duration and views in video
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: _videoId,
        },
      });

      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    getVideoDetails();
  }, [_videoId]);

  useEffect(() => {
    // channel details
    const getChannelIcons = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.default);
    };
    getChannelIcons();
  }, [channelId]);

  const handleWatchVideo = () => {
    navigate(`/watch/${_videoId}`);
  };

  return (
    <div className="video" onClick={handleWatchVideo}>
      <div className="video__content">
        <LazyLoadImage src={medium.url} effect="blur" />
        <span className="video__content__duration">{_duration}</span>
      </div>
      <div className="video__title">{title}</div>
      <div className="video__details">
        <span>
          <AiFillEye /> {numeral(views).format("0.a")} Views
        </span>
        <span>{moment(publishedAt).fromNow()}</span>
      </div>
      {/* channel name and img  */}
      {!channelScreen && (
        <div className="video__channel">
          <LazyLoadImage src={channelIcon?.url} effect="blur" />
          <p>{channelTitle}</p>
        </div>
      )}
    </div>
  );
};

export default Video;
