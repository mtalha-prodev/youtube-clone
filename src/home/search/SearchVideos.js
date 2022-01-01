import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getVideosBySearched } from "../../redux/actions/video.action";
import { Container } from "react-bootstrap";
import HorizentalVideo from "../../components/horizentalVideos/HorizentalVideo";

const SearchVideos = () => {
  const { query } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideosBySearched(query));
  }, [query, dispatch]);

  const { videos, loading } = useSelector((state) => state.searchedVideo);

  return (
    <Container>
      {!loading ? (
        videos?.map((video) => (
          <HorizentalVideo videos={video} key={video.id.videoId} searchScreen />
        ))
      ) : (
        <h3>Loading...</h3>
      )}
    </Container>
  );
};

export default SearchVideos;
