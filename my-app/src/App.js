import "./App.css";
import Settings from "./components/Settings";
import Timer from "./components/Timer";
import SettingsContext from "./components/SettingsContext";
import { useState } from "react";

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(30);
  const [breakMinutes, setBreakMinutes] = useState(10);

  return (
    <main>
      <SettingsContext.Provider
        value={{
          showSettings,
          workMinutes,
          breakMinutes,
          setWorkMinutes,
          setBreakMinutes,
          setShowSettings,
        }}
      >
        {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
    </main>
  );
}

export default App;
