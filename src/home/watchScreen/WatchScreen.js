import React from "react";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import Comments from "../../components/comments/Comments";
import ContentLoader from "react-content-loader";
import HorizentalVideo from "../../components/horizentalVideos/HorizentalVideo";
import MetaData from "../../components/meta/MetaData";
import "./_watchScreen.scss";
import {
  getRelatedVideos,
  getVideoById,
} from "../../redux/actions/video.action";

const WatchScreen = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getVideoById(id));

    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);

  const { videos, loading: relatedLoading } = useSelector(
    (state) => state.relatedVideos
  );

  const { video, loading } = useSelector((state) => state.selectedVideo);

  return (
    <Row>
      <Col lg={7}>
        <div className="watchScreen__player">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder={0}
            allowFullScreen
            title={video?.snippet?.title}
            width="100%"
            height="100%"
          ></iframe>
        </div>
        {!loading ? <MetaData video={video} videoId={id} /> : "loading..."}

        <Comments
          videoId={id}
          totalComments={video?.statistics?.commentCount}
        />
      </Col>
      <Col lg={5} className="p-0">
        {!relatedLoading ? (
          videos
            ?.filter((video) => video.snippet)
            .map((video) => (
              <HorizentalVideo videos={video} key={video.id.videoId} />
            ))
        ) : (
          <ContentLoader
            speed={2}
            width={400}
            height={140}
            viewBox="0 0 400 140"
            backgroundColor="#343a40"
            foregroundColor="#3c4147"
          >
            <rect x="0" y="0" rx="3" ry="3" width="55%" height="130px" />
          </ContentLoader>
        )}
      </Col>
    </Row>
  );
};

export default WatchScreen;
