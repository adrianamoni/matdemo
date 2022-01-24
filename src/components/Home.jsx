import React from "react";
import Text from "../languages/Text";

const Home = () => {
  return (
    <div>
      <Text tid={"home"} />
      {`${Text({ tid: "home" })}`}
      {Text({ tid: "home" })}
    </div>
  );
};

export default Home;
