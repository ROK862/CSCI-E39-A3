import React, { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import { APP_RENDER_KEYS } from "../../context/settings";
import "./TimerDisplay.css";
import TimerActionButtons from "./TimerActionButtons";

const TimerDisplay = () => {
  const {
    currentTimer,
    workflowState,
    rounds,
    formattedTime: displayTime,
    setTimerStatus: onPauseTimer,
    onSkipRound,
    onStopTimer:onCloseTimer,
    onFastForward,
  } = useContext(AppContext);

  const renderState = () => {
    const TimerButtons = (
      <TimerActionButtons
        onPauseTimer={onPauseTimer}
        onSkipRound={onSkipRound}
        onCloseTimer={onCloseTimer}
        onFastForward={onFastForward}
      />
    );

    switch (currentTimer) {
      case APP_RENDER_KEYS.TABATA:
        return (
          <div className="gen-content-wrapper">
            <div className="Timer-Tittle">{workflowState}</div>
            <div className="digital-display-wrapper">{displayTime}</div>
            <pre className="Rounds-Preview">Rounds: {rounds}</pre>
            {TimerButtons}
          </div>
        );
      case APP_RENDER_KEYS.XY:
        return (
          <div className="gen-content-wrapper">
            <div className="digital-display-wrapper">{displayTime}</div>
            <pre className="Rounds-Preview">Rounds: {rounds}</pre>
            {TimerButtons}
          </div>
        );
      default:
        return (
          <div className="gen-content-wrapper">
            <div className="digital-display-wrapper">{displayTime}</div>
            {TimerButtons}
          </div>
        );
    }
  };
  return <>{renderState()}</>;
}

export default TimerDisplay;
