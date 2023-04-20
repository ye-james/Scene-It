import React, { useContext } from "react";
import HeroContainer from "./HeroContainer";
import PopularContainer from "./PopularContainer";
import { FallingLines, ThreeCircles } from "react-loader-spinner";
import { StateContext } from "../../context/StateContext";

const Home = () => {
  const { fetching } = useContext(StateContext);
  return (
    <div className="home-container">
      {fetching ? (
        <>
          <div className="spinner">
            <h1>Loading data </h1>
            {/* <FallingLines
              color="#ffe3a2"
              width="150"
              visible={true}
              ariaLabel="falling-lines-loading"
            /> */}
            <ThreeCircles
              height="60"
              width="60"
              color="#ffe3a2"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
            />
          </div>
        </>
      ) : (
        <>
          {" "}
          <HeroContainer />
          <PopularContainer />
        </>
      )}
    </div>
  );
};

export default Home;
