import React, { useContext } from "react";
import AnchorButton from "../buttons/AnchorButton";
import { AppContext } from "../../context/AppProvider";
import { APP_ICONS } from "../../context/settings";

const PauseDisplay = () => {
  // Simplify the code in parent component by getting getters and setters straigt from context
  // At this level, i think it is still manage-able. However, you'll be the judge of it :).
  const {
    formattedTime: displayTime,
    setTimerStatus: onResumeTimer,
    onStopTimer: onCloseTimer,
  } = useContext(AppContext);
  return (
    <div className="gen-content-wrapper">
      <div className="digital-display-wrapper">{displayTime}</div>
      <div className="button-wrapper">
        <AnchorButton
          size={"sm"}
          radious="cl"
          icon={APP_ICONS.RESUME}
          onClick={() => onResumeTimer("timing")}
        />
        <AnchorButton
          size={"sm"}
          radious="cl"
          icon={APP_ICONS.RESET}
          onClick={onCloseTimer}
        />
      </div>
    </div>
  );
}

export default PauseDisplay;
