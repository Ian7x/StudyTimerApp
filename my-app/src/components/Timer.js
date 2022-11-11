import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import PauseButton from "./PauseButton";
import PlayButton from "./PlayButton";
import SettingsButton from "./SettingsButton";
import SettingsContext from "./SettingsContext";
import React, { useState, useEffect, useRef, useContext } from "react";
import Ticking from "./Ticking";
import EndCount from "./EndCount";

export default function Timer() {
  const settingsInfo = useContext(SettingsContext);
  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work"); // work/break/null
  const [secondsLeft, setSecondsLeft] = useState(0);
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  const red = "#f54e4e";
  const green = "#4aec8c";

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === "work" ? "break" : "work";
      const nextSeconds =
        (nextMode === "work"
          ? settingsInfo.workMinutes
          : settingsInfo.breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds =
    mode === "work"
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div>
      <CircularProgressbar
        value={percentage}
        text={minutes + ":" + seconds}
        styles={buildStyles({
          textColor: mode === "work" ? green : red,
          pathColor: mode === "work" ? green : red,
          tailColor: "rgba(255,255,255,.2)",
        })}
      />
      <div className="sett">
        {isPaused ? (
          <>
            <PlayButton
              onClick={() => {
                setIsPaused(false);
                isPausedRef.current = false;
              }}
            />
          </>
        ) : (
          <>
            <PauseButton
              onClick={() => {
                setIsPaused(true);
                isPausedRef.current = true;
              }}
            />
            <Ticking />
            {seconds < 6 ? <EndCount></EndCount> : ""}
          </>
        )}

        <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
      </div>
      {mode === "work" ? (
        <div className="study">Study Time!</div>
      ) : (
        <div className="break">Take a break!</div>
      )}
    </div>
  );
}
