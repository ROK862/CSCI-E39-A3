import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import AnchorButton from "../buttons/AnchorButton";
import { AppContext } from "../../context/AppProvider";
import AppUIStateToggle from "./AppUIStateToggle";
import { APP_UI_KEYS } from "../../context/settings";
import Input from "../Inputs/Input";
import TimeInputs from "./TimeInputs";

const DigitalWatch = ({ vebros }) => {
  // Simplify the code in parent component by getting getters and setters straigt from context
  // At this level, i think it is still manage-able. However, you'll be the judge of it :).
  const {
    formattedTime: displayTime,
    onAddTimer,
    onStopTimer: onCloseTimer,
    setSeconds: onSetSeconds,
    setMinutes: onSetMinutes,
    setHours: onSetHours,
  } = useContext(AppContext);
  const { hours, minutes, seconds, interfaceState, currentTimer, timerQueue } =
    useContext(AppContext);
  const toggleOnSettings = interfaceState !== APP_UI_KEYS.FLOW;
  const [scheduleName, setScheduleName] = useState(
    `${currentTimer} (${timerQueue.length})`
  );

  return (
    <div className="gen-content-wrapper">
      <AppUIStateToggle />
      {toggleOnSettings && (
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
      <div className="Preview">{displayTime || "00:00:00:00"}</div>
      <div className="Action-Wrapper">
        {!vebros && (
          <>
            <AnchorButton
              name="Add Timer"
              className="Special"
              onClick={() => onAddTimer({ name: scheduleName })}
            />
            <AnchorButton name="Close Timer" onClick={onCloseTimer} />
          </>
        )}
      </div>
    </div>
  );
};

DigitalWatch.propTypes = {
  vebros: PropTypes.bool,
};

DigitalWatch.defaultProps = {
  vebros: false,
};

export default DigitalWatch;
