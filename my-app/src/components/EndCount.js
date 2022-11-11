import React from "react";
import ReactHowler from "react-howler";
import fiveSeconds from "./sounds/fiveSeconds.mp3";

export default function EndCount() {
  return <ReactHowler src={fiveSeconds} playing={true} />;
}
