import React, { useContext, useState } from "react";
import Options from "../Inputs/Options";
import AnchorButton from "../buttons/AnchorButton";
import { AppContext } from "../../context/AppProvider";
import { APP_RENDER_KEYS, APP_UI_KEYS } from "../../context/settings";
import AppUIStateToggle from "./AppUIStateToggle";
import Input from "../Inputs/Input";
import "./TimerRenderer.css";
import TimeInputs from "./TimeInputs";


const TimerRenderer = () => {
  // Simplify the code in parent component by getting getters and setters straigt from context
  // At this level, i think it is still manage-able. However, you'll be the judge of it :).
  const {
    currentTimer,
    setRounds,
    formattedTime: displayTime,
    formattedBreakTime: displayBreakTime,
    onAddTimer,
    onStopTimer: onCloseTimer,
    setSeconds: onSetSeconds,
    setMinutes: onSetMinutes,
    setHours: onSetHours,
    timerQueue,
    setBreakHours: onSetBreakHours,
    setBreakMinutes: onSetBreakMinutes,
    setBreakSeconds: onSetBreakSeconds,
    breakHours,
    breakMinutes,
    breakSeconds,
    interfaceState,
    rounds,
    hours,
    minutes,
    seconds,
  } = useContext(AppContext);
  const [scheduleName, setScheduleName] = useState(
    `${currentTimer} (${timerQueue.length})`
  );
  const toggleOnSettings = interfaceState !== APP_UI_KEYS.FLOW;

  const renderState = () => {
    switch (currentTimer) {
      case APP_RENDER_KEYS.TABATA:
        return (
          <div className="gen-content-wrapper">
            <AppUIStateToggle />
            <pre className="title-wrapper">Workout Duration</pre>
            {!toggleOnSettings ? (
              <>
                <div className="Preview Small">{displayTime}</div>
              </>
            ) : (
              <div className="digital-display-wrapper">
                <Input
                  onChange={setScheduleName}
                  label={"Name your Schedule."}
                  placeholder={"Name your Schedule."}
                  value={scheduleName}
                />
                <TimeInputs
                  onSetHours={onSetHours}
                  onSetSeconds={onSetSeconds}
                  onSetMinutes={onSetMinutes}
                  hours={hours}
                  minutes={minutes}
                  seconds={seconds}
                />
              </div>
            )}
            <pre className="title-wrapper">Break Duration</pre>
            {!toggleOnSettings ? (
              <div className="Preview Small">{displayBreakTime}</div>
            ) : (
              <div className="digital-display-wrapper">
                <TimeInputs
                  onSetHours={onSetBreakHours}
                  onSetMinutes={onSetBreakMinutes}
                  onSetSeconds={onSetBreakSeconds}
                  hours={breakHours}
                  minutes={breakMinutes}
                  seconds={breakSeconds}
                />
              </div>
            )}

            <div className="Preview">
              {!toggleOnSettings ? (
                <>
                  <pre className="title-wrapper">Rounds</pre>
                  <div className="Preview Small">{rounds}</div>
                </>
              ) : (
                <>
                  <Options
                    options={[...Array(30).keys()]}
                    onChange={setRounds}
                    current={rounds || 0}
                    name="Rounds"
                  />
                </>
              )}
            </div>
            <div className="Action-Wrapper">
              <AnchorButton
                name="Add Timer"
                className="Special"
                onClick={() => onAddTimer({ name: scheduleName })}
              />
              <AnchorButton name="Close Timer" onClick={onCloseTimer} />
            </div>
          </div>
        );
      default:
        return (
          <div className="gen-content-wrapper">
            <AppUIStateToggle />

            {!toggleOnSettings ? (
              <>
                <pre className="title-wrapper">Time</pre>
                <div className="Preview Small">{displayTime}</div>
              </>
            ) : (
              <div className="digital-display-wrapper">
                <Input
                  onChange={setScheduleName}
                  label={"Name your Schedule."}
                  placeholder={"Name your Schedule."}
                  value={scheduleName}
                />
                <TimeInputs
                  onSetHours={onSetHours}
                  onSetMinutes={onSetMinutes}
                  onSetSeconds={onSetSeconds}
                  hours={hours}
                  minutes={minutes}
                  seconds={seconds}
                />
              </div>
            )}
            {!toggleOnSettings ? (
              <>
                <pre className="title-wrapper">Rounds</pre>
                <div className="Preview Small">{rounds}</div>
              </>
            ) : (
              <div className="Preview">
                {displayTime || "00:00:00:00"}
                <Options
                  options={[...Array(30).keys()]}
                  onChange={setRounds}
                  current={rounds || 0}
                  name="Rounds"
                />
              </div>
            )}
            <div className="Action-Wrapper">
              <AnchorButton
                name="Add Timer"
                className="Special"
                onClick={() => onAddTimer({ name: scheduleName })}
              />
              <AnchorButton name="Close Timer" onClick={onCloseTimer} />
            </div>
          </div>
        );
    }
  };
  return <>{renderState()}</>;
}

export default TimerRenderer;
