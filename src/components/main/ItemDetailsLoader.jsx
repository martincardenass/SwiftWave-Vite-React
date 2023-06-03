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
    <rect x="0" y="80" rx="5" ry="5" width="500" height="500px" />
    <rect x="0" y="595" rx="5" ry="5" width="250" height="45px" />
    <rect x="535" y="135" rx="5" ry="5" width="270" height="45px" />
    <rect x="535" y="200" rx="5" ry="5" width="775" height="190px" />
    <rect x="535" y="410" rx="5" ry="5" width="190" height="35px" />
    <rect x="685" y="470" rx="5" ry="5" width="250" height="65px" />
    <rect x="950" y="470" rx="5" ry="5" width="195" height="65px" />
    <rect x="535" y="550" rx="5" ry="5" width="775" height="65px" />
  </ContentLoader>
);

export default DetailsLoader;
