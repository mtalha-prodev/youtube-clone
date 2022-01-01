import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getSubsctiptionChannel } from "../../redux/actions/video.action";

import HorizentalVideo from "../../components/horizentalVideos/HorizentalVideo";

const SubscriptionsScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubsctiptionChannel());
  }, [dispatch]);

  const { loading, videos } = useSelector((state) => state.subscriptionChannel);

  return (
    <Container fluid>
      {!loading
        ? videos.map((video) => (
            <HorizentalVideo videos={video} key={video.id} subScreen />
          ))
        : "Loading"}
    </Container>
  );
};

export default SubscriptionsScreen;
