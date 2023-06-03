import React from "react";
import ContentLoader from "react-content-loader";

const MiscLoader = (props) => (
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
    <rect x="0" y="0" rx="0" ry="0" width="282px" height="348px" />
    <rect x="307" y="0" rx="0" ry="0" width="282px" height="348px" />
    <rect x="614" y="0" rx="0" ry="0" width="282px" height="348px" />
    <rect x="921" y="0" rx="0" ry="0" width="282px" height="348px" />
    <rect x="1228" y="0" rx="0" ry="0" width="282px" height="348px" />
    <rect x="1535" y="0" rx="0" ry="0" width="282px" height="348px" />
    {/* Second line */}
    <rect x="0" y="380" rx="0" ry="0" width="282px" height="348px" />
    <rect x="307" y="380" rx="0" ry="0" width="282px" height="348px" />
    <rect x="614" y="380" rx="0" ry="0" width="282px" height="348px" />
    <rect x="921" y="380" rx="0" ry="0" width="282px" height="348px" />
    <rect x="1228" y="380" rx="0" ry="0" width="282px" height="348px" />
    <rect x="1535" y="380" rx="0" ry="0" width="282px" height="348px" />
    {/* Third line */}
    <rect x="0" y="763" rx="0" ry="0" width="282px" height="348px" />
    <rect x="307" y="763" rx="0" ry="0" width="282px" height="348px" />
    <rect x="614" y="763" rx="0" ry="0" width="282px" height="348px" />
    <rect x="921" y="763" rx="0" ry="0" width="282px" height="348px" />
    <rect x="1228" y="763" rx="0" ry="0" width="282px" height="348px" />
    <rect x="1535" y="763" rx="0" ry="0" width="282px" height="348px" />
    {/* Third line */}
    <rect x="0" y="1130" rx="0" ry="0" width="282px" height="348px" />
    <rect x="307" y="1130" rx="0" ry="0" width="282px" height="348px" />
    <rect x="614" y="1130" rx="0" ry="0" width="282px" height="348px" />
    <rect x="921" y="1130" rx="0" ry="0" width="282px" height="348px" />
    <rect x="1228" y="1130" rx="0" ry="0" width="282px" height="348px" />
    <rect x="1535" y="1130" rx="0" ry="0" width="282px" height="348px" />
  </ContentLoader>
);

export default MiscLoader;
