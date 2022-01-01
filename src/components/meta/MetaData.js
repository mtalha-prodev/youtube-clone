import moment from "moment";
import numeral from "numeral";
import { useState, useEffect } from "react";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import ShowMoreText from "react-show-more-text";
import {
  getChannelDetails,
  getChannelSubscribe,
} from "../../redux/actions/channel.action";
import "./_meta.scss";

const MetaData = ({ video: { snippet, statistics }, videoId }) => {
  const { publishedAt, channelId, title, description, channelTitle } = snippet;

  const { viewCount, likeCount, dislikeCount } = statistics;
  const dispatch = useDispatch();

  const { channels, subscriptionStatus } = useSelector(
    (state) => state.channelDetails
  );

  const { snippet: channelSnippet, statistics: channelStatistics } = channels;

  useEffect(() => {
    dispatch(getChannelDetails(channelId));
    dispatch(getChannelSubscribe(channelId));
  }, [dispatch, channelId]);

  return (
    <div className="metadata">
      <div className="metadata__top">
        <h5>{title}</h5>
        <div className="d-flex align-items-center justify-content-between py-2">
          <span>
            {numeral(viewCount).format("0.a")} Views .
            {moment(publishedAt).fromNow()}
          </span>
          <div>
            <span className="mx-2">
              <MdThumbUp size={23} />
              {numeral(likeCount).format("0.a")}
            </span>
            <span className="mx-2">
              <MdThumbDown size={23} />
              {numeral(dislikeCount).format("0.a")}
            </span>
          </div>
        </div>
      </div>
      <div className="metadata__channel">
        <div className="d-flex align-items-center  justify-content-between">
          <div className="d-flex align-items-center">
            <img src={channelSnippet?.thumbnails?.default?.url} alt="logo" />
            <span>
              <p>{channelTitle}</p>
              {numeral(channelStatistics?.subscriberCount).format("0.a")}{" "}
              Subscribes
            </span>
          </div>
          <button className={`border-0  ${subscriptionStatus && "btn-gray"}`}>
            {subscriptionStatus ? "Subscribed" : "Subscribe"}
          </button>
        </div>
      </div>
      <div className="metadata__description">
        <ShowMoreText
          lines={3}
          more="SHOW MORE"
          less="SHOW LESS"
          anchorClass="showMoreText"
          expanded={false}
        >
          {description}
        </ShowMoreText>
      </div>
    </div>
  );
};

export default MetaData;
