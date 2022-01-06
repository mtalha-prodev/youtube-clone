import React from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Video from "../../components/videos/Video";
import { getVideoByPlaylist } from "../../redux/actions/video.action";
import ContentLoader from "react-content-loader";
import numeral from "numeral";
import { getChannelDetails } from "../../redux/actions/channel.action";
import "./_channelVideo.scss";

const ChannelVideo = () => {
  const { channelId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideoByPlaylist(channelId));
    dispatch(getChannelDetails(channelId));
  }, [dispatch, channelId]);

  const { loading, videos } = useSelector((state) => state.channelVideo);

  const { snippet, statistics } = useSelector(
    (state) => state.channelDetails.channels
  );

  return (
    <>
      <div className="px-5 py-2 my-2 d-flex justify-content-between align-items-center channelHeader">
        <div className="d-flex align-items-center">
          <img src={snippet?.thumbnails?.default?.url} alt="" />

          <div className="ml-3 channelHeader__details">
            <h3>{snippet?.title}</h3>
            <span>
              {numeral(statistics?.subscriberCount).format("0.a")} subscribers
            </span>
          </div>
        </div>

        <button>Subscribe</button>
      </div>

      <Container>
        <Row className="mt-2">
          {!loading
            ? videos.map((video, i) => (
                <Col md={4} lg={3} key={i}>
                  <Video video={video} channelScreen />
                </Col>
              ))
            : [...Array(16)].map((v, i) => (
                <Col md={4} lg={3} key={i}>
                  <ContentLoader
                    speed={2}
                    width={400}
                    height={140}
                    viewBox="0 0 400 140"
                    backgroundColor="#343a40"
                    foregroundColor="#3c4147"
                  >
                    <rect
                      x="0"
                      y="0"
                      rx="3"
                      ry="3"
                      width="55%"
                      height="130px"
                    />
                  </ContentLoader>
                </Col>
              ))}
        </Row>
      </Container>
    </>
  );
};

export default ChannelVideo;
