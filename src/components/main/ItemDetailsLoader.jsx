import React from "react";
import ContentLoader from "react-content-loader";

const DetailsLoader = (props) => (
  <ContentLoader
    speed={1}
    width={"100%"}
    height={"100vh"}
    //! viewBox="0 0 400 360"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {/* Text */}
    <rect x="180" y="155" rx="5" ry="5" width="385" height="50px" />
    <rect x="180" y="230" rx="5" ry="5" width="485" height="135px" />
    <rect x="180" y="380" rx="5" ry="5" width="200" height="33px" />
    <rect x="180" y="440" rx="5" ry="5" width="260" height="58px" />
    <rect x="455" y="440" rx="5" ry="5" width="195" height="58px" />
    <rect x="180" y="520" rx="5" ry="5" width="485" height="80px" />
    {/* Image and its text */}
    <rect x="1160" y="70" rx="5" ry="5" width="150" height="25px" />
    <rect x="820" y="100" rx="5" ry="5" width="490" height="505px" />
    <rect x="820" y="610" rx="5" ry="5" width="175" height="50px" />
    <rect x="1000" y="610" rx="5" ry="5" width="125" height="50px" />
  </ContentLoader>
);

export default DetailsLoader;
