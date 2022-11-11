import ReactHowler from "react-howler";
import ticking from "./sounds/ticking.mp3";

export default function Ticking() {
  return <ReactHowler src={ticking} playing={true} loop={true} />;
}
