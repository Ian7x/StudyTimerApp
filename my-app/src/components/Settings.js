import "./slider.css";
import SettingsContext from "./SettingsContext";
import ReactSlider from "react-slider";
import BackButton from "./BackButton";
import React, { useContext } from "react";

export default function Settings() {
  const settingsInfo = useContext(SettingsContext);
  return (
    <div>
      <label className="label-color-green" htmlFor="">
        Study time - {settingsInfo.workMinutes} min
      </label>

      <ReactSlider
        className="slider"
        thumbClassName="thumb"
        trackClassName="track"
        value={settingsInfo.workMinutes}
        onChange={(newValue) => settingsInfo.setWorkMinutes(newValue)}
        min={1}
        max={120}
      />

      <label className="label-color-red" htmlFor="">
        Break time - {settingsInfo.breakMinutes} min
      </label>
      <ReactSlider
        className="slider red"
        thumbClassName="thumb"
        trackClassName="track"
        value={settingsInfo.breakMinutes}
        onChange={(newValue) => settingsInfo.setBreakMinutes(newValue)}
        min={1}
        max={120}
      />
      <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
    </div>
  );
}
