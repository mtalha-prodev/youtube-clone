import React, { useEffect } from "react";
import { Col, Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import Categories from "../components/categories/Categories";
import Videos from "../components/videos/Video";
import ContentLoader from "react-content-loader";

import {
  getPopularVideo,
  getVideosByCategories,
} from "../redux/actions/video.action";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const { videos, activeCategory, loading } = useSelector(
    (state) => state.homeVideos
  );

  const fetchData = () => {
    if (activeCategory === "All") {
      dispatch(getPopularVideo());
    } else {
      dispatch(getVideosByCategories(activeCategory));
    }
  };

  useEffect(() => {
    dispatch(getPopularVideo());
  }, [dispatch]);

  return (
    <Container>
      <Categories />
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchData}
        hasMore={true}
        loader={
          <div className="spinner-border text-danger d-block mx-auto"></div>
        }
        className="row overflow-hidden"
      >
        {videos.map((video, i) => (
          <Col key={i} lg={3} md={4}>
            <Videos video={video} />
          </Col>
        ))}
      </InfiniteScroll>
    </Container>
  );
};

export default HomeScreen;
