import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonVideo = () => {
  return (
    // <SkeletonTheme color="#343a40" highlightColor="#3c4147">
    //   <Skeleton height={180} />
    //   <div>
    //     <Skeleton style={{ margin: "0.5rem" }} circle height={40} width={40} />
    //     <Skeleton height={40} width="75%" />
    //   </div>
    // </SkeletonTheme>
    <div style={{ width: "100%", margin: "1rem 0" }}>
      <ContentLoader
        speed={2}
        width={400}
        height={140}
        viewBox="0 0 400 140"
        backgroundColor="#343a40"
        foregroundColor="#3c4147"
      >
        <rect x="0" y="0" rx="3" ry="3" width="55%" height="140px" />
        {/* <circle cx="17" cy="100" r="14" /> */}
        {/* <rect x="40" y="90" rx="2" ry="2" width="140" height="25" /> */}
      </ContentLoader>
    </div>
  );
};

export default SkeletonVideo;
