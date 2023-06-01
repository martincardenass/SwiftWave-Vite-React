import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={1}
    width={"100%"}
    height={"100vh"}
    //! viewBox="0 0 400 360"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {/* First line */}
    <rect x="0" y="0" rx="0" ry="0" width="282px" height="342px" />
    <rect x="328" y="0" rx="0" ry="0" width="282px" height="342px" />
    <rect x="656" y="0" rx="0" ry="0" width="282px" height="342px" />
    <rect x="984" y="0" rx="0" ry="0" width="282px" height="342px" />
    <rect x="1312" y="0" rx="0" ry="0" width="282px" height="342px" />
    {/* Second line */}
    <rect x="0" y="375" rx="0" ry="0" width="282px" height="342px" />
    <rect x="328" y="375" rx="0" ry="0" width="282px" height="342px" />
    <rect x="656" y="375" rx="0" ry="0" width="282px" height="342px" />
    <rect x="984" y="375" rx="0" ry="0" width="282px" height="342px" />
    <rect x="1312" y="375" rx="0" ry="0" width="282px" height="342px" />
    {/* Third line */}
    <rect x="0" y="750" rx="0" ry="0" width="282px" height="342px" />
    <rect x="328" y="750" rx="0" ry="0" width="282px" height="342px" />
    <rect x="656" y="750" rx="0" ry="0" width="282px" height="342px" />
    <rect x="984" y="750" rx="0" ry="0" width="282px" height="342px" />
    <rect x="1312" y="750" rx="0" ry="0" width="282px" height="342px" />
    {/* Fourth line */}
    <rect x="0" y="1125" rx="0" ry="0" width="282px" height="342px" />
    <rect x="328" y="1125" rx="0" ry="0" width="282px" height="342px" />
    <rect x="656" y="1125" rx="0" ry="0" width="282px" height="342px" />
    <rect x="984" y="1125" rx="0" ry="0" width="282px" height="342px" />
    <rect x="1312" y="1125" rx="0" ry="0" width="282px" height="342px" />
  </ContentLoader>
);

export default MyLoader;
