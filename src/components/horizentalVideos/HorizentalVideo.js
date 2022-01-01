import moment from "moment";
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { AiFillEye } from "react-icons/ai";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router";
import request from "../../api";

import "./_horizentalVideo.scss";

const HorizentalVideo = ({ videos, searchScreen, subScreen }) => {
  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const {
    id,
    snippet: {
      channelId,
      publishedAt,
      title,
      description,
      thumbnails,
      channelTitle,
      resourceId,
    },
  } = videos;

  useEffect(() => {
    const getVideoDetails = async () => {
      /* array kay ander sy items ki value lanay ga derect tarika like without destracturing "data.items" and destructure way {data:{items}} */
      // catch the duration and views in video
      const { data } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: id.videoId,
        },
      });

      setDuration(data.items[0].contentDetails.duration);
      setViews(data.items[0].statistics.viewCount);
    };
    getVideoDetails();
  }, [id]);

  const _channelId = resourceId?.channelId || channelId;
  // const _channelId = channelId;

  const navigate = useNavigate();
  const handleWatch = () => {
    isVideo
      ? navigate(`/watch/${id.videoId}`)
      : navigate(`/channel/${_channelId}`);
  };

  const isVideo = !(id.kind === "youtube#channel" || subScreen);

  const thumbnail = !isVideo && "horizentalVideo__thumbnail-channel";

  return (
    <Row
      className="horizentalVideo py-1 mx-1 my-3  align-items-center"
      onClick={handleWatch}
    >
      <Col
        xs={5}
        md={searchScreen || subScreen ? 3 : 5}
        className="horizentalVideo__left p-0"
      >
        <LazyLoadImage
          src={thumbnails?.medium?.url}
          effect="blue"
          className={`horizentalVideo__thumbnail ${thumbnail}`}
          wrapperClassName="horizentalVideo__thumbnail-wrapper"
        />
        {isVideo && (
          <span className="horizentalVideo__duration">{_duration}</span>
        )}
      </Col>
      <Col
        xs={7}
        md={searchScreen || subScreen ? 9 : 6}
        className="horizentalVideo__right"
      >
        <p className="horizentalVideo__right__title mb-1 pr-0">{title}</p>
        <div className="video__detail ">
          {isVideo && (
            <>
              <p className="views">
                <AiFillEye />
                {numeral(views).format("0.a")} Views •{" "}
                {moment(publishedAt).fromNow()}
              </p>
              <p className="mb-1">{channelTitle}</p>
              <p className="des">{description}</p>
            </>
          )}

          {!isVideo && (searchScreen || subScreen) && (
            <p className="channel m-0">{description}</p>
          )}

          {subScreen && (
            <p className="mt-2">
              {videos.contentDetails.totalItemCount} Videos
            </p>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default HorizentalVideo;
